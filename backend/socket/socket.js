import { Server } from "socket.io";
import http from "http";
import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: process.env.NODE_ENV === "production" 
			? ["https://adeshdomain.com"] // Replace with your production domain
			: ["http://localhost:5173", "http://localhost:3000", "http://localhost:3001"], // Development origins
		methods: ["GET", "POST"],
		credentials: true, // Allow cookies to be sent
	},
});

export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}

// Socket.IO authentication middleware
io.use(async (socket, next) => {
	try {
		const token = socket.handshake.auth.token || socket.handshake.headers.cookie?.split('jwt=')[1]?.split(';')[0];
		
		if (!token) {
			return next(new Error("Authentication error: No token provided"));
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		
		if (!decoded) {
			return next(new Error("Authentication error: Invalid token"));
		}

		const user = await User.findById(decoded.userId).select("-password");
		
		if (!user) {
			return next(new Error("Authentication error: User not found"));
		}

		// Attach user data to socket for later use
		socket.userId = user._id.toString();
		socket.user = user;
		
		next(); // Authentication successful
	} catch (error) {
		console.log("Socket authentication error:", error.message);
		next(new Error("Authentication error: " + error.message));
	}
});

io.on("connection", (socket) => {
	console.log("a user connected", socket.id, "User:", socket.user.username);

	const userId = socket.userId; // Use authenticated userId instead of query parameter
	
	// Add user to online users map
	userSocketMap[userId] = socket.id;

	// io.emit() is used to send events to all the connected clients
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	// socket.on() is used to listen to the events. can be used both on client and server side
	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id, "User:", socket.user.username);
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

export { app, io, server };