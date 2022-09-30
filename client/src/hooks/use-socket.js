import { useCallback, useEffect, useState } from "react";
import io from "socket.io-client";

export const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [online, setOnline] = useState(false);

  const connectSocket = useCallback(() => {
    const socketTemp = io("http://localhost:5000", {
      transports: ["websocket"],
    });

    setSocket(socketTemp);
  }, []);

  const disconnectSocket = useCallback(() => {
    socket?.disconnect();
  }, [socket]);

  useEffect(() => {
    setOnline(socket?.connected);
  }, [socket]);

  useEffect(() => {
    socket?.on("connect", () => setOnline(true));
  }, [socket]);

  useEffect(() => {
    socket?.on("disconnect", () => setOnline(false));
  }, [socket]);

  return {
    socket,
    online,
    connectSocket,
    disconnectSocket,
  };
};
