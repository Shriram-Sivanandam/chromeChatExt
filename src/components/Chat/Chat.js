import React, { useState, useEffect } from "react";

import TextContainer from "../TextContainer/TextContainer";
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";

import "./Chat.css";

const Chat = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar
          room={room}
          showModal={showModal}
          setShowModal={setShowModal}
        />
        <Messages messages={messages} name={name} />
        <Input message={message} setMessage={setMessage} />
      </div>
      <div className={`ab ${showModal ? "" : "no"}`}>
        {/* <TextContainer users={users} /> */}
      </div>
    </div>
  );
};

export default Chat;
