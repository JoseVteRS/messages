import { useContext } from "react";
import { useForm } from "react-hook-form";
import { ChatContext } from "../context/chat-context";
import { SocketContext } from "../context/socket-context";
import SendIcon from "./icons/send-icon";

const SendMessageForm = () => {
  const { chatDispatch } = useContext(ChatContext);
  const { socket } = useContext(SocketContext);

  const { handleSubmit, register, reset } = useForm();

  const handleOnSubmit = (data) => {
    if (data.message.length === 0) return;
    socket?.emit("one_to_all", data.message);
    reset({ message: "" });
  };

  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit)}
      className="fixed md:w-1/3 right-2 left-2 bottom-2"
    >
      <input
        className="w-full bg-zinc-700 p-3 rounded-xl focus:outline-none text-zinc-400"
        type="text"
        placeholder="Type here"
        autoComplete="off"
        {...register("message")}
      />

      <button
        type="submit"
        className="bg-red-900  hover:bg-red-800 text-zinc-300 p-5 h-8 w-8 rounded-xl absolute top-1 right-1 grid place-content-center"
      >
        <SendIcon className="h-5 w-5 stroke-red-400" />
      </button>
    </form>
  );
};

export default SendMessageForm;
