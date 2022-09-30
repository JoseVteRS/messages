import { ChatProvider } from "../src/context/chat-context";
import { SocketProvider } from "../src/context/socket-context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ChatProvider>
      <SocketProvider>
        <Component {...pageProps} />
      </SocketProvider>
    </ChatProvider>
  );
}

export default MyApp;
