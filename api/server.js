const express = require("express");
const server = express();

const actionsRouter = require("./actions/actions-router.js");
const projectsRouter = require("./projects/projects-router.js");
const helmet = require("helmet");

server.use(helmet());
server.use(express.json());

server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);

server.use("/", (req, res) => {
  res.status(200).send(`<h2>4.1 Sprint API is up</h2>`);
});

server.use((error, req, res, next) => {
  error.error && console.error(error.error);
  res.status(error.status).json({ message: error.message });
});

module.exports = server;
