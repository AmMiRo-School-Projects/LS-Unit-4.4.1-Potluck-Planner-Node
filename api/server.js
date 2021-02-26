// assign express
const express = require("express");

// assign routers
const usersRouter = require("../users/usersRouter.js");
const authRouter = require("../users/authRouter.js");
const potlucksRouter = require("../potlucks/potlucksRouter.js");
const attendeesRouter = require("../attendees/attendeesRouter");
const contributionsRouter = require("../contributions/contributionsRouter");
const potluckContributionsRouter = require("../potluck-contributions/potluckContributionsRouter.js");

// assign server
const server = express();

// use JSON
server.use(express.json());
// use Routers
server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);
server.use("/api/potlucks", potlucksRouter);
server.use("/api/attendees", attendeesRouter);
server.use("/api/contributions", contributionsRouter);
server.use("/api/potluckContributions", potluckContributionsRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "API is running" });
});

module.exports = server;
