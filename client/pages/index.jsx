import { useContext } from "react";

import ResetIcon from "../src/components/icons/reset-messages";

import Message from "../src/components/message";
import SendMessageForm from "../src/components/send-message-form";
import StartGameInfo from "../src/components/start-game";
import { ChatContext } from "../src/context/chat-context";
import { SocketContext } from "../src/context/socket-context";
import { TYPES } from "../src/lib/types/action.types";

export default function Home() {
  const { socket, resetMessages } = useContext(SocketContext);
  const { chatState, chatDispatch } = useContext(ChatContext);

  const onHandleReset = () => {
    chatDispatch({ type: TYPES.resetMessages });
  };

  return (
    <div className="p-5 bg-zinc-900 min-h-screen">
      <div className="mx-auto md:w-1/3 overflow-y-scroll bg-neutral-700/20 p-3 rounded-2xl h-[90vh]">
        <button onClick={onHandleReset}>
          <ResetIcon className="stroke-zinc-200 h-5 w-5" />
        </button>

        {chatState.messages.length === 0 && <StartGameInfo />}

        {chatState.messages.map((msg, index) => {
          return (
            <Message
              key={`${socket.id}-${index}`}
              message={msg}
              socketId={socket.id}
            />
          );
        })}

        <div className="relative w-full">
          <SendMessageForm />
        </div>
      </div>
    </div>
  );
}
