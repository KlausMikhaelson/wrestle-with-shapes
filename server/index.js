const express = require("express");
const app = express();
const port = 3001 || process.env.PORT;
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

let playerCount = 0;

io.on("connection", (socket) => {
  console.log("a user connected");
  playerCount++;
  console.log(playerCount, socket.id);
  socket.on("disconnect", () => {
    console.log("user disconnected");
    playerCount--;
  });
  socket.on("joinGame", () => {
    console.log("New player joined the game");
    socket.broadcast.emit("newPlayer", { id: socket.id }); // Use "newPlayer" instead of "Yooo"
  });
  socket.on("move", (data) => {
    console.log(data);
    socket.broadcast.emit("move", data);
  });
});

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
