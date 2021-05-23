import React, { useState } from "react";
import "./Join.css";
import Chat from "../Chat/Chat";
import { Link } from "react-chrome-extension-router";
import socket from "../Socket/Socket";
import randomNumber from "../RandomNumber/RandomNumber";
import { useStateValue } from "../../contexts/UserDetails";

export default function Join({ isPublic, create }) {
	const [{}, dispatch] = useStateValue();
	const [name, setName] = useState("");
	const [room, setRoom] = useState("");
	var roomCode = randomNumber();
	const test = () => {
		const code = document.getElementById("roomCode").value;
		console.log(code);
		const url = window.location.href;
		socket.emit("joinPrivateRoom", { url, name, code });
		dispatch({
			type: "SET_DETAILS",
			user: name,
			roomCode: code,
			url: url,
		});
	};
	return (
		<div className="joinOuterContainer">
			<div className="joinInnerContainer">
				<h2 className="joinHeading">Join a Chat Room</h2>
				<div>
					<input
						placeholder="Name"
						className="joinInput"
						type="text"
						onChange={(event) => setName(event.target.value)}
					/>
				</div>
				<div>
					<input
						className={`joinInput mt-20 ${isPublic ? "no" : ""}`}
						placeholder="Room"
						type="text"
						id="roomCode"
						defaultValue={create && roomCode}
						readOnly
					/>
				</div>
				<Link component={Chat} onClick={test}>
					<button className="joinButton mt-20" type="submit">
						Enter Room
					</button>
				</Link>
			</div>
		</div>
	);
}