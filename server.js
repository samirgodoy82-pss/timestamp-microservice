// Timestamp Microservice - Node.js / Express
// Cumple con los requisitos del proyecto FreeCodeCamp

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Sin parámetro → fecha actual
app.get('/api', (req, res) => {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString()
  });
});

// Con parámetro
app.get('/api/:date', (req, res) => {
  const date = req.params.date;

  let parsedDate;

  if (/^\d+$/.test(date)) {
    parsedDate = new Date(parseInt(date));
  } else {
    parsedDate = new Date(date);
  }

  if (parsedDate.toString() === 'Invalid Date') {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString()
  });
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
