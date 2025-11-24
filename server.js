const express = require("express");
const cors = require("cors");
const dns = require("dns");
const { URL } = require("url");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const urls = [];
let idCounter = 1;

app.get("/", (req, res) => {
  res.send("URL Shortener Microservice");
});

app.post("/api/shorturl", (req, res) => {
  const originalUrl = req.body.url;
  if (!originalUrl) return res.json({ error: "invalid url" });

  let hostname;
  try {
    const parsed = new URL(originalUrl);
    hostname = parsed.hostname;
  } catch (err) {
    return res.json({ error: "invalid url" });
  }

  dns.lookup(hostname, (err) => {
    if (err) return res.json({ error: "invalid url" });

    const existing = urls.find(u => u.original_url === originalUrl);
    if (existing) return res.json(existing);

    const entry = { original_url: originalUrl, short_url: idCounter++ };
    urls.push(entry);
    res.json(entry);
  });
});

app.get("/api/shorturl/:id", (req, res) => {
  const id = Number(req.params.id);
  const entry = urls.find(u => u.short_url === id);
  if (!entry) return res.json({ error: "No URL found" });
  res.redirect(entry.original_url);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Servidor en puerto " + port));
