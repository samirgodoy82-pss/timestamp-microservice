// Timestamp Microservice - Node.js / Express
// Cumple con los requisitos del proyecto FreeCodeCamp

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/:date?', (req, res) => {
  const { date } = req.params;

  // Caso sin parámetro: devolver tiempo actual
  if (!date) {
    const now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString(),
    });
  }

  let parsedDate;

  // Si es número (timestamp en milisegundos)
  if (/^\d+$/.test(date)) {
    parsedDate = new Date(parseInt(date));
  } else {
    parsedDate = new Date(date);
  }

  // Validar si es fecha válida
  if (parsedDate.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
