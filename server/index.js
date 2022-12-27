const express = require("express")
const cors = require("cors")
const app = express();
const {Server} = require("socket.io")
const http = require("http")

app.use(cors());

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

app.listen(3000, () => console.log("server is running"))