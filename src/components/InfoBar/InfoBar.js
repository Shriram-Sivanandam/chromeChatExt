import React from "react";
import { Link } from "react-chrome-extension-router";

import home from "../../icons/home.png";
// import users from "../../icons/people.png";

import Choose from "../Choose/Choose";

import "./InfoBar.css";

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <h3>Room {room}</h3>
    </div>
    <div className="rightInnerContainer">
      {/* <div onClick={() => setShowModal(!showModal)}>
        <img className="usersIconDiv" src={users} alt="users" />
      </div> */}
      <Link component={Choose}>
        <img src={home} alt="home" />
      </Link>
    </div>
  </div>
);

export default InfoBar;
