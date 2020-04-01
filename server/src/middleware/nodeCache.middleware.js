const app = require("express").Router();
const cache = require("../utils/nodeCache.utils");

app.use((req, res, next) => {
  try {
    const ip = req.socket.remoteAddress || req.headers["X-Forwarded-For"];
    console.log("remote Adress", ip);
    const addr = cache.get("ip");
    if (!addr) {
      cache.set("ip", ip);
      next();
    } else return res.sendStatus(403);
  } catch (ex) {
    res.sendStatus(501);
  }
});

module.exports = app;
