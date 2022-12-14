import { createContext, useContext, useEffect } from "react";
import { useSocket } from "../hooks/use-socket";
import { TYPES } from "../lib/types/action.types";
import { ChatContext } from "./chat-context";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { socket, online, connectSocket, disconnectSocket } = useSocket(
    "http://localhost:5000"
  );

  const { chatDispatch } = useContext(ChatContext);

  useEffect(() => {
    connectSocket();
  }, [connectSocket]);

  useEffect(() => {
    socket?.on("one_to_all", (message) => {
      chatDispatch({
        type: TYPES.newMessage,
        payload: message,
      });
    });
  }, [socket, chatDispatch]);

  useEffect(() => {
    socket?.emit("create_room", "test");
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        online,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
