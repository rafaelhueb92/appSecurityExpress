const app = require("express").Router();

const redis = require("redis");
const { RateLimiterRedis } = require("rate-limiter-flexible");

const redisClient = redis.createClient({
  enable_offline_queue: false,
  password: "Redis2019!"
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

module.exports = app;
