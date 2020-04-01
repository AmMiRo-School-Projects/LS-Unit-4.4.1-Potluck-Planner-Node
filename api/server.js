// assign express
const express = require("express");

// assign routers
const usersRouter = require("../users/usersRouter");
const authRouter = require("../users/authRouter");

// assign server
const server = express();

// use JSON
server.use(express.json());
// use Routers
server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "API is running" });
});

module.exports = server;
