import React from "react";
import { Link } from "react-chrome-extension-router";

import closeIcon from "../../icons/closeIcon.png";
import users from "../../icons/people.png";

import Choose from "../Choose/Choose";

import "./InfoBar.css";

const InfoBar = ({ room, showModal, setShowModal }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <h3>Room Name: {room}</h3>
    </div>
    <div className="rightInnerContainer">
      <div onClick={() => setShowModal(!showModal)}>
        <img className="usersIconDiv" src={users} alt="users" />
      </div>
      <Link component={Choose}>
        <img src={closeIcon} alt="close icon" />
      </Link>
    </div>
  </div>
);

export default InfoBar;
