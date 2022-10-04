import { useContext } from "react";
import { SocketContext } from "../context/socket-context";
import { randomWord } from "../lib/markov";

const StartGameInfo = () => {
  const { socket } = useContext(SocketContext);

  const handleRandomWord = () => {
    socket?.emit("one_to_all", randomWord());
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-black p-4 rounded-2xl">
        <p className="text-zinc-200 text-lg font-medium mb-8">Hola,</p>
        <p className="text-zinc-200 text-sm mb-3">
          A continuación te voy dejar cierta información relevante
        </p>

        <ul className="text-zinc-300 my-8 text-sm [&>*]:mb-3 [&>*]:list-disc [&>*]:ml-4">
          <li>Cualquier persona conectada al chat podrá leer los mensajes</li>
          <li>Nadie sabrá quien a escrito el mensaje</li>
          <li>
            Todo mensaje <b className="text-red-500">NO</b> escrito por ti,
            aparecerá en el lado{" "}
            <span className="bg-zinc-800 p-1 inline-block w-fit rounded-lg">
              izquierdo
            </span>{" "}
          </li>
          <li>
            Todo mensaje escrito por ti aparecerán en el lado{" "}
            <span className="bg-red-900 p-1 inline-block w-fit rounded-lg">
              derecho
            </span>
          </li>
          <li>
            Si recargas el navegador o te sales de la aplicación
            <b className="text-red-500"> TODOS</b> los mensajes escritos y
            recibidos ser perderán para siempre.
          </li>
          <li>
            No existe Base de datos, ni cookies,
            <b className="text-red-500"> NADA</b>
          </li>
          <li>Nunca sabrás si alguien se conecta o desconecta</li>
          <li>Nunca sabrás si alguien se conecta o desconecta</li>
        </ul>

        <p className="text-zinc-200 text-xl mb-3">Que empice el juego 😈</p>

        {/* <button
          onClick={handleRandomWord}
          className=" text-white underline decoratio-solid decoration-2"
        >
          Saludo aleatorio
        </button> */}
      </div>
    </div>
  );
};

export default StartGameInfo;
