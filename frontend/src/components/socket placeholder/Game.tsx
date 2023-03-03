import React, { useEffect, useState } from "react";
import { io}  from "socket.io-client";
import axios from "axios";
import {
	VStack,
	Input,
	Box,
	Heading,
	Text,
	Button,
	useToast,
	Divider,
} from "@chakra-ui/react";
const Game = () => {
	// connecting to socket
	const URL = "http://localhost:8080";
	const socket = io("http://localhost:8080");
	//
	const [name, setName] = useState<string>("");
	const [available, setAvailable] = useState<boolean>(false);
	const [room, setRoom] = useState<string>("");
	const [score, setScore] = useState<number>(0);
	const [start, setStart] = useState(false);

	const toast = useToast();
	const checkName = async () => {
		try {
			let res = await axios.post(`${URL}/user/checkname`, {
				name,
			});
			toast({
				title: "Account created.",
				description: "We've created your account for you.",
				status: "success",
				duration: 9000,
				isClosable: true,
			});
			setAvailable(true);
		} catch (error) {
			toast({
				title: "Account created.",
				description: "We've created your account for you.",
				status: "error",
				duration: 9000,
				isClosable: true,
			});
			setAvailable(false);
		}
	};

	const createRoom = () => {
		socket.emit("create_room");
	};

	const joinRoom = () => {
		socket.emit("join_room", { roomId: room, player: name });
	};
	const incScore = () => {
		socket.emit("inc_score", { name, score: score + 1, roomId: room });
	};
	const startGame = () => {
		socket.emit("start_game", { room });
	};
	useEffect(() => {
		socket.on("room_created", (roomId) => {
			console.log("Room created", roomId);
			setRoom(roomId);
		});
		socket.on("joined_room", (data) => {
			console.log(data);
		});
		socket.on("room_not_found", () => {
			alert("Room not found");
		});
		socket.on("room_full", () => {
			alert("Room full");
		});
		socket.on("new_score", (data) => {
			// console.log(name, score, roomId);
			// setScore(score);
			console.log(data);
		});
		socket.on("game_begins", (data) => {
			console.log(data);
			setStart(data);
		});
	}, [socket]);
	return (
		<div>
			<VStack>
				<Input
					type="text"
					placeholder="Enter your name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<Button onClick={checkName}>Confirm</Button>
			</VStack>
			<Divider colorScheme={"orange"} size={"30px"} />
			<VStack>
				<Button onClick={createRoom} isDisabled={!available}>
					Create Room
				</Button>
			</VStack>
			<VStack>
				<Input
					type={"text"}
					placeholder="Enter Room ID"
					value={room}
					onChange={(e) => setRoom(e.target.value)}
				/>
				<Button onClick={joinRoom} isDisabled={!available}>
					Join Room
				</Button>
			</VStack>
			<Heading>
				{name} - {score}
			</Heading>
			<Button onClick={incScore}>Inc</Button>
			<Button>dec</Button>
			<Box>
				<Button onClick={startGame}>Start game</Button>
				<Heading>{start ? "Game started" : "Not Started"}</Heading>
			</Box>
		</div>
	);
};

export default Game;
