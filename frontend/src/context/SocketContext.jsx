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
            const getCookie = (name) => {
                const value = `; ${document.cookie}`;
                const parts = value.split(`; ${name}=`);
                if (parts.length === 2) return parts.pop().split(';').shift();
                return null;
            };

            const token = getCookie('jwt');
            
            // Use current window location for socket connection in Docker
            const socketUrl = process.env.NODE_ENV === 'production' 
                ? window.location.origin 
                : "http://localhost:3001";
            
            const socket = io(socketUrl, {
                auth: {
                    token: token,
                },
                query: {
                    userId: authUser._id,
                },
                withCredentials: true,
            });

            setSocket(socket);

            socket.on("connect_error", (error) => {
                console.error("Socket connection error:", error.message);
                if (error.message.includes("Authentication error")) {
                    console.log("Authentication failed, user might need to login again");
                }
            });

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