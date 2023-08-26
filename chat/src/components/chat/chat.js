import React, { useEffect, useState } from "react";
import { user } from "../join/join";
import SocketIO from "socket.io-client";
import Message from "../message/message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsChatHeart } from "react-icons/bs";
const ENDPOINT = "https://baat-karo-h9k7.vercel.app/";
let socket;
const Chat = () => {
  const [id, setId] = useState(" ");
  const [messages, setMessages] = useState([]);
  const send = () => {
    const message = document.getElementById("inputmessage").value;
    socket.emit("message", { message, id });
    document.getElementById("inputmessage").value = " ";
  };
  useEffect(() => {
    socket = SocketIO(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {
      alert("connected");
      setId(socket.id);
    });

    socket.emit("joined", { user });
    socket.on("join", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    socket.on("joinedUser", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    socket.on("leave", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message, data.id);
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, []);
  useEffect(() => {
    socket.on("sendmessage", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });
    return () => {
      socket.off();
    };
  }, [messages]);

  return (
    <div className="max-w-lg xl:h-96 xl:mx-auto mx-1 p-5">
      <div
        className="bg-white rounded-lg shadow-md xl:h-96"
        style={{ height: "100vh" }}
      >
        <div className="p-2 border-b flex justify-between items-center w-full">
          <div className="flex gap-2 text-xl items-center">
            <BsChatHeart className="text-red-700" />
            <h2 className="font-bold font-serif">CHAT APP</h2>
          </div>
          <a href="/">
            <AiFillCloseCircle className="text-xl" />
          </a>
        </div>
        <div className="p-2" style={{ height: "calc(100vh - 150px)" }}>
          <ReactScrollToBottom
            className="chatBox overflow-y-auto"
            style={{ maxHeight: "" }}
          >
            {messages.map((item, i) => (
              <Message
                key={i}
                user={item.id === id ? "" : item.user}
                message={item.message}
                classs={item.id === id ? "left" : "right"}
              />
            ))}
          </ReactScrollToBottom>
        </div>
        <div className="p-2 border-t">
          <div className="flex">
            <input
            onKeyDown={(e) =>
              e.key === 'Enter' ? send() : null
            }
              type="text"
              placeholder="Type your message..."
              className="flex-grow border rounded-full py-2 px-4 focus:outline-none focus:ring"
              id="inputmessage"
            />
            <button
              className="ml-3 bg-blue-400 text-white rounded-full px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring"
              onClick={send}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chat;
