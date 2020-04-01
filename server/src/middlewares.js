const express = require("express");
const app = express.Router();
const helmet = require("helmet");
const cors = require("cors");


app.use(express.static(`${process.cwd()}/public`));

app.use(helmet());
app.use(cors());

app.use("/:msg", (req, res, next) => {
  if (req.method !== "GET") return res.sendStatus(403);
  next();
});

module.exports = app;
