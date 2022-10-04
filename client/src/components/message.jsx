import clsx from "clsx";

const Message = ({ message, socketId }) => {
  const handleOnClickMessage = () => {
    console.log(message.id);
  };

  return (
    <div
      onClick={handleOnClickMessage}
      className={clsx(
        socketId === message.id ? "justify-end" : "justify-start",
        "flex"
      )}
    >
      <p
        className={clsx(
          socketId === message.id ? "bg-red-900" : "bg-neutral-900",
          "rounded-lg max-w-xs p-2 my-1 text-zinc-200 shadow text-sm"
        )}
      >
        {message.message}
      </p>
    </div>
  );
};

export default Message;
