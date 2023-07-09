const express = require("express");
const app = express();
const port = 3001 || process.env.PORT;
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

let players = {};

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("joinGame", () => {
    console.log("New player joined the game");

    // Send the existing players' data to the new player
    socket.emit("playerData", { playerId: socket.id, players });

    // Add the new player to the players object
    players[socket.id] = { id: socket.id };

    // Broadcast the new player's data to other players
    socket.broadcast.emit("newPlayer", { id: socket.id });

    console.log("Total players:", Object.keys(players).length);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");

    // Remove the player from the players object
    delete players[socket.id];

    console.log("Total players:", Object.keys(players).length);
  });

  socket.on("playerPosition", (data) => {
    // Update the position of the player identified by the socket id
    players[socket.id].position = data.position;

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
