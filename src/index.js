const { PORT } = process.env;
const http = require("http");
const express = require("express");

const app = express();

app.use("api/", require("./routes"));
app.use(require("./middlewares"));
http
  .createServer(app)
  .listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
