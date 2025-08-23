import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { authUser } = useAuthContext();

	useEffect(() => {
		if (authUser) {
			// Function to get cookie value by name
			const getCookie = (name) => {
				const value = `; ${document.cookie}`;
				const parts = value.split(`; ${name}=`);
				if (parts.length === 2) return parts.pop().split(';').shift();
				return null;
			};

			const token = getCookie('jwt');
			
			const socket = io("http://localhost:3001", {
				auth: {
					token: token, // Send JWT token for authentication
				},
				query: {
					userId: authUser._id, // Keep for backward compatibility
				},
				withCredentials: true, // Important for cookies
			});

			setSocket(socket);

			// Handle connection errors
			socket.on("connect_error", (error) => {
				console.error("Socket connection error:", error.message);
				// Optionally redirect to login if authentication fails
				if (error.message.includes("Authentication error")) {
					console.log("Authentication failed, user might need to login again");
				}
			});

			// socket.on() is used to listen to the events. can be used both on client and server side
			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			return () => socket.close();
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [authUser]);

	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};
