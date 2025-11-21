const express = require("express");
const app = express();

app.get("/api/:date?", (req, res) => {
  let date = req.params.date;

  // Si no hay parámetro, usar fecha actual
  if (!date) {
    const now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString()
    });
  }

  // Si es un número → timestamp
  let parsedDate = /^\d+$/.test(date)
    ? new Date(parseInt(date))
    : new Date(date);

  // Validar fecha
  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Respuesta correcta
  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString()
  });
});

const port = 3000;
app.listen(port, () => {
  console.log("Servidor funcionando en puerto " + port);
});
