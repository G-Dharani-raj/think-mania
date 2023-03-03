const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const connectDB = require("./db");
const userRouter = require("./routes/user.routes");
const movieRouter = require("./routes/movies.routes");
const MovieModel = require("./models/MovieMode.model");
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
	socket.on("join_room", (data) => {
		try {
			if (io.sockets.adapter.rooms.get(data).size < 2) {
				console.log(`user ${socket.id} joined room ${data}`);
				const tmp = data + "";
				socket.join(tmp);
				console.log(io.sockets.adapter.rooms.get(tmp).size);
			} else {
				socket.emit("room_full");
			}
		} catch (e) {
			socket.join(data);
		}
		// socket.join(data);
		// console.log(io.sockets.adapter.rooms.get(data).size);
	});
	socket.on("send_message", (data) => {
		console.log(data);
		socket.to(data.room).emit("recieved_message", data.msg);
	});
	socket.on("buzzer_click", (data) => {
		console.log(socket.id);
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
		if (io.sockets.adapter.rooms.get(data.room).size != 2) {
			socket.emit("not_full", false);
		} else {
			io.to(data.room).emit("game_begins", true);
			// socket.emit("game_begins", true);
		}
	});

	socket.on("disconnect", () => {
		console.log("disconnected", socket.id);
	});
});

server.listen(8080, () => {
	console.log("listening on 8080");
	connectDB();
});
