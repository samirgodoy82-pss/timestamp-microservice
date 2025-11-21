const express = require("express");
const cors = require("cors");
const dns = require("dns");
const { URL } = require("url");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// "Base de datos" en memoria
const urls = [];
let idCounter = 1;

// Ruta raíz (opcional)
app.get("/", (req, res) => {
  res.send("URL Shortener Microservice - lista /api/shorturl");
});

// POST -> crear versión corta
app.post("/api/shorturl", (req, res) => {
  const originalUrl = req.body.url;

  if (!originalUrl) {
    return res.json({ error: "invalid url" });
  }

  let hostname;
  try {
    const parsed = new URL(originalUrl);
    hostname = parsed.hostname;
  } catch (err) {
    // URL inválida sintácticamente
    return res.json({ error: "invalid url" });
  }

  // Validar dominio con DNS
  dns.lookup(hostname, (err) => {
    if (err) {
      return res.json({ error: "invalid url" });
    }

    // Si ya existe ese original_url, devolver la entrada existente (opcional)
    const existing = urls.find((u) => u.original_url === originalUrl);
    if (existing) {
      return res.json(existing);
    }

    const entry = {
      original_url: originalUrl,
      short_url: idCounter,
    };
    urls.push(entry);
    idCounter++;

    return res.json(entry);
  });
});

// GET -> redirigir
app.get("/api/shorturl/:id", (req, res) => {
  const id = Number(req.params.id);
  const entry = urls.find((u) => u.short_url === id);
  if (!entry) return res.json({ error: "No URL found" });
  return res.redirect(entry.original_url);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor ejecutándose en puerto ${port}`);
});
