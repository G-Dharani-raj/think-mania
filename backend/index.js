const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const connectDB = require("./db");
const userRouter = require("./routes/user.routes");
const movieRouter = require("./routes/movies.routes");
const MovieModel = require("./models/MovieMode.model");
const shortid = require("shortid");
app.use(cors());
app.use(express.json());

// routes
app.use("/user", userRouter);
app.use("/movies", movieRouter);

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "*",
	},
});
let rooms = { js: undefined };
io.on("connection", (socket) => {
	socket.on("create_room", () => {
		let roomId = shortid.generate();
		// console.log(roomId);
		// rooms[roomId + ""] = {
		// 	users: 0,
		// };
		// socket.join(roomId);
		// console.log(io.sockets.adapter.rooms.get(roomId).size);
		// console.log(rooms);
		socket.emit("room_created", roomId);
	});

	socket.on("join_room", (data) => {
		console.log(io.sockets.adapter.rooms);
		try {
			if (io.sockets.adapter.rooms.get(data).size < 2) {
				console.log(`user ${socket.id} joined room ${data}`);
				const tmp = data + "";
				socket.join(tmp);
				socket.emit("joined_room", data);
				console.log(io.sockets.adapter.rooms.get(tmp).size);
			} else {
				socket.emit("room_full");
			}
		} catch (e) {
			socket.join(data);
		}
		console.log(rooms);
		// const { roomId, player } = data;
		// if (rooms[roomId + ""]) {
		// 	if (rooms[roomId + ""].users < 2) {
		// 		rooms[roomId + ""].users++;
		// 		rooms[roomId + ""][socket.id] = {
		// 			name: player,
		// 			score: 0,
		// 			roomId: roomId,
		// 		};
		// 		socket.emit("joined_room", {
		// 			...rooms[roomId + ""][socket.id],
		// 		});
		// 	} else {
		// 		socket.emit("room_full");
		// 	}
		// } else {
		// 	console.log("does not exist");
		// 	socket.emit("room_not_found");
		// }
	});
	socket.on("send_message", (data) => {
		// console.log(data);
		socket.to(data.room).emit("recieved_message", data.msg);
	});
	socket.on("buzzer_click", (data) => {
		// console.log(socket.id);
		socket.to(data.room).emit("buzzer_rang", false);
	});

	socket.on("send_question", async (data) => {
		let res = await MovieModel.aggregate([{ $sample: { size: 1 } }]);
		// console.log(Array.from(io.adapter.rooms.entries()));
		// socket.broadcast.to(data.room).emit("question_received", res);
		// io.sockets.emit("question_received", res);
		io.to(data.room).emit("question_received", res);
	});

	socket.on("start_game", (data) => {
		try {
			if (io.sockets.adapter.rooms.get(data.room).size != 2) {
				socket.emit("not_full", false);
			} else {
				io.to(data.room).emit("game_begins", true);
				// socket.emit("game_begins", true);
			}
		} catch (error) {
			socket.emit("not_full", false);
		}
		// console.log(rooms[data.room]);
		// if (rooms[data.room].users < 2) {
		// 	socket.emit("not_full", false);
		// } else {
		// 	io.to(data.room).emit("game_begins", true);
		// }
	});

	socket.on("inc_score", (data) => {
		// console.log(data);
		rooms[data.roomId + ""][socket.id].score = data.score;
		// rooms[data.roomId + ""][socket.id][score] = data.score;
		console.log(rooms[data.roomId + ""][socket.id]);
		io.sockets.in(data.roomId).emit("new_score", true);
		// socket.emit("new_score", true);
	});

	socket.on("disconnect", () => {
		console.log("disconnected", socket.id);
	});
});

server.listen(process.env.PORT || 8080, () => {
	console.log("listening on 8080");
	connectDB();
});
