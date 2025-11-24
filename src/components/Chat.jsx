import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    //As soon as the page loads th socket connection is made and join chat event is emitted
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });
    socket.on("messageRecieved", ({ firstName, text }) => {
      setMessages((messages) => [...messages, { firstName, text }]);
    });
    return () => {
      socket.disconnect();
    };
  }, [userId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="w-[80%] rounded-2xl border-2 border-stone-200 p-3 m-auto">
      <h1 className="p-5  border-b border-gray-600">Chat</h1>
      <div className="h-110 overflow-auto">
        {messages.map((msg, index) => {
          return (
            <div key={index} className="my-2">
              {msg.firstName != user.firstName && (
                <div className="chat chat-start px-4">
                  <div className="flex flex-col items-start">
                    <span className="text-xs text-gray-500 font-semibold px-1 rounded bg-gray-200 mb-0">
                      {msg.firstName}
                    </span>
                    <div className="chat-bubble chat-bubble-primary shadow-md mt-1">
                      {msg.text}
                    </div>
                  </div>
                </div>
              )}

              {msg.firstName == user.firstName && (
                <div className="chat chat-end">
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-gray-600 font-semibold px-1 rounded bg-gray-100 mb-0">
                      You
                    </span>
                    <div className="chat-bubble chat-bubble-info shadow-md mt-1">
                      {msg.text}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex h-10">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          type="text"
          className="w-full bg-ston-500 rounded-l-sm bg-base-200 outline-none p-2"
        />
        <button
          onClick={sendMessage}
          className="bg-primary px-4 rounded-r-sm  h-10 "
        >
          send
        </button>
      </div>
    </div>
  );
};

export default Chat;
