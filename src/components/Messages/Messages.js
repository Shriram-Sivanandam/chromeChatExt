import React, { useState } from "react";

import ScrollToBottom from "react-scroll-to-bottom";

// import Penguid from "../../icons/penguid.jpg";

import "./Message.css";
import socket from "../Socket/Socket";
// import { useStateValue } from "../../contexts/UserDetails";

class User {
  constructor(id, username) {
    this.id = id;
    this.username = username;
  }
}

class Message {
  constructor(message, type) {
    this.message = message;
    this.type = type;
  }
}

class MessageGroup {
  messages = [];

  constructor(sender, message) {
    this.sender = sender;
    this.messages.push(message);
  }
  addMessage(message) {
    this.messages.push(message);
  }
}

function endsWithAny(suffixes, string) {
  for (let suffix of suffixes) {
    if (string.endsWith(suffix)) return true;
  }
  return false;
}

const me = new User(socket.id, "test");

const Messages = ({ messages, name }) => {
  const [messageGroups, setMessageGroups] = useState([]);
  useState(() => {
    socket.on(
      "recieveMessage",
      ({ message, type, id, user }) => {
        if (message != null) {
          console.log(message, type);
          const newMessage = new Message(message, type);
          const sender = new User(id, user);
          setMessageGroups((messageGroups) => {
            const messageGroup = new MessageGroup(sender, newMessage);
            return [...messageGroups, messageGroup];
          });
        }
      },
      [socket]
    );
  });
  return (
    <div className="bg">
      <ScrollToBottom className="messages">
        <div className="bg">
          {messageGroups.map((data) => {
            if (data.sender.id == socket.id) {
              if (data.messages[0].type == "text") {
                return (
                  <div className="messageContainer justifyEnd">
                    <div className="messageBox backgroundBlue tri-right right-top">
                      {/* <small className="sentText top">
                        {data.sender.username}
                      </small> */}
                      <p className="messageText colorWhite">
                        {data.messages[0].message}
                      </p>
                      <div className="timestamp">
                        <small className="time">13:24</small>
                      </div>
                    </div>
                  </div>
                );
              } else if (
                data.messages[0].type === "file" &&
                endsWithAny(
                  [".pdf", ".docx", ".txt", ".ppt", ".pptx", ".doc"],
                  data.messages[0].message
                )
              ) {
                return (
                  <div className="messageContainer justifyEnd">
                    <div className="messageBox backgroundBlue tri-right right-top">
                      {/* <small className="sentText top">
                        {data.sender.username}
                      </small> */}
                      <p className="messageText colorWhite">
                        <a
                          className="messageText colorWhite"
                          href={`http://localhost:5000/${data.messages[0].message}`}
                          target="blank"
                        >
                          click here to see the file 📩
                        </a>
                      </p>
                    </div>
                  </div>
                );
              } else if (
                data.messages[0].type === "image" &&
                endsWithAny(
                  [".png", ".jpg", ".jpeg", ".webp"],
                  data.messages[0].message
                )
              ) {
                return (
                  <div className="messageContainer justifyEnd">
                    <div className="messageBox backgroundBlue tri-right right-top">
                      {/* <small className="sentText top">
                        {data.sender.username}
                      </small> */}
                      <p className="messageText colorWhite">
                        <img
                          className="sentImage"
                          src={`http://localhost:5000/${data.messages[0].message}`}
                          alt="image"
                        />
                      </p>
                    </div>
                  </div>
                );
              } else if (
                data.messages[0].type === "image" &&
                endsWithAny([".mp4", ".mov", ".wmv"], data.messages[0].message)
              ) {
                return (
                  <div className="messageContainer justifyEnd">
                    <div className="messageBox backgroundBlue tri-right right-top">
                      {/* <small className="sentText top">
                        {data.sender.username}
                      </small> */}
                      <p className="messageText colorWhite">
                        <video width="200" height="120" controls>
                          <source
                            src={`http://localhost:5000/${data.messages[0].message}`}
                            type="video/mp4"
                          />
                        </video>
                      </p>
                    </div>
                  </div>
                );
              }
            } else if (data.messages[0].type == "text") {
              return (
                <div className="messageContainer justifyStart">
                  <div className="messageBox backgroundGreen tri-right left-top">
                    <small className="sentText greenName top">
                      {data.sender.username}
                    </small>
                    <p className="messageText colorWhite">
                      {data.messages[0].message}
                    </p>
                    <div className="timestamp">
                      <small className="time">13:24</small>
                    </div>
                  </div>
                </div>
              );
            } else if (
              data.messages[0].type === "file" &&
              endsWithAny(
                [".pdf", ".docx", ".txt", ".ppt", ".pptx", ".doc"],
                data.messages[0].message
              )
            ) {
              return (
                <div className="messageContainer justifyStart">
                  <div className="messageBox backgroundGreen">
                    <small className="sentText greenName top">
                      {data.sender.username}
                    </small>
                    <p className="messageText colorWhite">
                      <a
                        href={`http://localhost:5000/${data.messages[0].message}`}
                        target="blank"
                      >
                        click here to see the file 📩
                      </a>
                    </p>
                  </div>
                </div>
              );
            } else if (
              data.messages[0].type == "image" &&
              endsWithAny(
                [".png", ".jpg", ".jpeg", ".webp", ".gif"],
                data.messages[0].message
              )
            ) {
              return (
                <div className="messageContainer justifyStart">
                  <div className="messageBox backgroundGreen">
                    <small className="sentText greenName top">
                      {data.sender.username}
                    </small>
                    <p className="messageText colorWhite">
                      <img
                        className="sentImage"
                        src={`http://localhost:5000/${data.messages[0].message}`}
                        alt="image"
                      />
                    </p>
                  </div>
                </div>
              );
            } else if (
              data.messages[0].type === "image" &&
              endsWithAny([".mp4", ".mov", ".wmv"], data.messages[0].message)
            ) {
              return (
                <div className="messageContainer justifyStart">
                  <div className="messageBox backgroundGreen">
                    <small className="sentText greenName top">
                      {data.sender.username}
                    </small>
                    <p className="messageText colorWhite">
                      <video width="200" height="120" controls>
                        <source
                          src={`http://localhost:5000/${data.messages[0].message}`}
                          type="video/mp4"
                        />
                      </video>
                    </p>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </ScrollToBottom>
    </div>
  );
};

export default Messages;

//stickers sent by others
{
  /* <div className="justifyStart stickerMessage">
<div className="stickerBox backgroundGreen">
  <small className="sentText">name</small>
</div>
<p className="messageText colorWhite">
  <img className="sentSticker" src={Penguid} alt="image" />
</p>
</div> */
}

{
  /* stickers sent by you */
}
{
  /* <div className="messageContainer justifyEnd stickerMessageSent">
  <div className="stickerBoxSent backgroundBlue">
    <small className="sentText">name</small>
  </div>
  <p className="messageText colorWhite">
    <img className="sentSticker" src={Penguid} alt="image" />
  </p>
</div>; */
}

// when you reply

{
  /* <div className="messageContainer justifyEnd">
  <div className="messageBox backgroundBlue tri-right right-top">
    <div className="repliedMessage">
      <small className="sentText">name</small>
      <p>message from other person</p>
    </div>
    <p className="messageText colorWhite">message</p>
  </div>
</div>; */
}

//when others reply

{
  /* <div className="messageContainer justifyStart">
  <div className="messageBox backgroundGreen">
    <small className="sentText">Sender's name</small>
    <div className="repliedMessage">
      <small className="sentText">name of replied message</small>
      <p>message from other person</p>
    </div>
    <p className="messageText colorWhite">message</p>
  </div>
</div>; */
}
