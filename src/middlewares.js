const express = require("express");
const app = express.Router();
const helmet = require("helmet");
const cors = require("cors");
const redis = require("redis");
const { RateLimiterRedis } = require("rate-limiter-flexible");

const redisClient = redis.createClient({
  enable_offline_queue: false
});

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  points: 20,
  duration: 1,
  blockDuration: 10
});

app.use(async (req, res, next) => {
  try {
    console.log("remote Adress", req.socket.remoteAddress);
    await rateLimiter.consume(req.socket.remoteAddress);
    next();
  } catch (ex) {
    res.sendStatus(403);
  }
});

app.use("/public", express.static(`${process.cwd()}/public`));

app.use(helmet());
app.use(cors());

app.use("/:msg", (req, res, next) => {
  if (req.method !== "GET") return res.sendStatus(403);
  next();
});

module.exports = app;
