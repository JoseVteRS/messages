import clsx from "clsx";

const Message = ({ message, socketId }) => {
  return (
    <div
      className={clsx(
        socketId === message.id ? "justify-end" : "justify-start",
        "flex"
      )}
    >
      <p
        className={clsx(
          socketId === message.id ? "bg-neutral-900" : "bg-neutral-800",
          "rounded-xl max-w-xs p-2 my-1 text-zinc-200 shadow text-sm"
        )}
      >
        {message.message}
      </p>
    </div>
  );
};

export default Message;
