const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.get("/api/whoami", (req, res) => {
  res.json({
    ipaddress: req.ip,
    language: req.headers["accept-language"],
    software: req.headers["user-agent"]
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Servidor ejecutándose en puerto " + port);
});
