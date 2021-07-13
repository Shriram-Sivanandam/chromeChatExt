import React, { useState } from "react";
import Picker, { SKIN_TONE_NEUTRAL } from "emoji-picker-react"; // To add emojis in the message

import "./Input.css";

import clip from "../../icons/clip.png";
import emoji from "../../icons/emoji.png";
import send from "../../icons/send.png";
import axios from "axios";
import socket from "../Socket/Socket";
import { useStateValue } from "../../contexts/UserDetails";

const Input = () => {
  const [{ user, roomCode, url }, dispatch] = useStateValue();
  const [showEmojiDiv, setShowEmojiDiv] = useState(false);
  const [message, setMessage] = useState("");

  const onEmojiClick = (event, emojiObject) => {
    setMessage(message + emojiObject.emoji);
  };
  const loadFile = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const id = socket.id;
    formData.append("image", e.target.files[0]);
    formData.append("user", user);
    formData.append("roomcode", roomCode);
    formData.append("url", url);
    formData.append("id", id);

    axios.post("http://localhost:5000/upload", formData);
    const type = "image";
    socket.emit("sendMessage", { user, id, message, type });
  };
  const sendMessage = (e) => {
    e.preventDefault();
    if (message != "") {
      const id = socket.id;
      const type = "text";
      socket.emit("sendMessage", { user, id, message, type });
      document.getElementById("message").value = "";
      setMessage("");
    }
  };
  return (
    <div>
      {/* Pops up a div to show the emoji selection box */}
      <div className={`${showEmojiDiv ? "emojiPickerDiv" : "no"}`}>
        <Picker
          onEmojiClick={onEmojiClick}
          skinTone={SKIN_TONE_NEUTRAL}
          pickerStyle={{ width: "100%" }}
        />
      </div>
      {/* Input field for the user to input their message */}
      <form className="form">
        <input
          type="file"
          id="file"
          style={{ display: "none" }}
          onChange={loadFile}
        ></input>
        <label for="file">
          <img
            className="inputIcons"
            src={clip}
            alt="attach"
            style={{ cursor: "pointer" }}
          />
        </label>
        <img
          onClick={() => setShowEmojiDiv(!showEmojiDiv)}
          className="inputIcons inputEmoji"
          src={emoji}
          alt="emoji"
          style={{ cursor: "pointer" }}
        />
        <input
          className="chatInput"
          type="text"
          id="message"
          autoComplete="off"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="sendButton" onClick={sendMessage}>
          <img className="sendIcon" src={send} alt="send" />
        </button>
      </form>
    </div>
  );
};

export default Input;
