import { Box, Input, Button, Heading } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

interface props {
	name: string;
	emojis: string;
}

const Page = () => {
	const socket = io("http://localhost:8080");
	const [msg, setMsg] = useState("");
	const [room, setRoom] = useState("");
	const [res, setRes] = useState("");
	const [current, setCurrent] = useState("");
	const [name, setName] = useState("");
	const [enabled, setEnabled] = useState(true);
	const [start, setStart] = useState(false);
	const [movie, setMovie] = useState<props[]>([]);
	const [newRoom, setNewRoom] = useState<string>("");
	const [score, setScore] = useState<number>(0);
	const [user, setUser] = useState<string>("");
	const sendMessage = () => {
		socket.emit("send_message", { msg, room });
	};
	const joinRoom = () => {
		if (room !== "") {
			socket.emit("join_room", room);
		}
	};
	const buzzerClick = () => {
		socket.emit("buzzer_click", { name, room });
	};
	const getMovie = async () => {
		// let res = await axios.get("http://localhost:8080/movies/getmovies");
		// setMovie(res.data);
		// console.log(movie);
		socket.emit("send_question", { room });
	};
	const startGame = () => {
		socket.emit("start_game", { room });
	};
	const createRoom = () => {
		socket.emit("create_room");
	};
	const incScore = () => socket.emit("inc_score", { room });
	useEffect(() => {
		socket.on("room_created", (roomId) => {
			setCurrent(roomId);
			setRoom(roomId);
			joinRoom();
		});
		socket.on("joined_room", (roomId) => setCurrent(roomId));
		socket.on("recieved_message", (msg) => {
			console.log(msg);
			setRes(msg);
		});
		socket.on("room_full", (msg) => {
			alert(
				"Room is full! Please select another room or create a new one."
			);
		});
		socket.on("buzzer_rang", (msg) => {
			console.log(msg);
			setEnabled(msg);
		});

		socket.on("question_received", (data) => {
			console.log(data);
			setMovie(data);
		});
		socket.on("game_begins", (data) => {
			setStart(data);
			getMovie();
		});
		socket.on("not_full", (data) => console.log(data));
		socket.on("room_created", (data) => setNewRoom(data));
	}, [socket]);

	return (
		<div>
			<Box>
				<Input
					type={"text"}
					value={room}
					onChange={(e) => setRoom(e.target.value)}
				/>
				<Button onClick={joinRoom}>Join room</Button>
			</Box>
			<Box>
				<Input
					type={"text"}
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<Button onClick={buzzerClick} isDisabled={!enabled}>
					buzzer
				</Button>
			</Box>
			<Box>
				<Input
					type={"text"}
					value={msg}
					onChange={(e) => setMsg(e.target.value)}
				/>
				<Button onClick={sendMessage}>Send message</Button>
			</Box>
			<Heading>{res}</Heading>
			<Button onClick={getMovie}> get movie</Button>
			<Button onClick={startGame}>Start game</Button>
			<Heading>{start ? "Game started" : "Not Started"}</Heading>
			<Box>{movie.length > 0 ? movie[0].emojis : ""}</Box>
			<Button onClick={createRoom}>Create Room</Button>
			<Heading>new room - </Heading>
			<Heading>{current}</Heading>
			<Box>
				<Input
					type="text"
					value={user}
					onChange={(e) => setUser(e.target.value)}
				/>
				<Button onClick={incScore}>Inc</Button>
				<Heading>{score}</Heading>
			</Box>
		</div>
	);
};

export default Page;
