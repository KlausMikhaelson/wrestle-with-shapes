const express = require("express");
const app = express();
const port = 3001 || process.env.PORT;
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

let players = [];

const generateRandomPosition = () => {
  return [Math.random() * 3, 5, Math.random() * 3];
};

io.on("connection", (socket) => {
  console.log("A user connected");

  players.push({
    playerId: socket.id,
    position: generateRandomPosition(),
  });
  io.emit("playerData", {
    players,
  });

  console.log("Total players:", Object.keys(players).length);

  socket.on("disconnect", () => {
    console.log("User disconnected");

    // Remove the player from the players object
    delete players[socket.id];
    socket.broadcast.emit("playerDisconnected", socket.id);
    players = players.filter((player) => player.playerId !== socket.id);
    io.emit("playerData", {
      players,
    });

    console.log("Total players:", Object.keys(players).length);
  });

  socket.on("playerPosition", (data) => {
    // Update the position of the player identified by the socket id
    // players[socket.id].position = data.position;

    // Broadcast the updated player position to other players
    socket.broadcast.emit("playerPosition", {
      playerId: socket.id,
      position: data.position,
    });
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
