const app = require("express").Router();
const proxy = require("express-http-proxy");

app.get("/:msg", (req, res) => {
  try {
    const { msg } = req.params;
    const html = `
      <html>
      <body>
      <h1>${msg}</h1>
      </body>
      </html>
      `;
    setTimeout(() => {
      res.send(html);
    }, 1000);
  } catch (ex) {
    res.sendStatus(500);
  }
});

module.exports = app;