
const express = require('express');
const app = express();


const port = process.env.PORT || 3000;


const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); 


app.get('/', (req, res) => {
  res.send(`
    <body style="font-family: sans-serif; padding: 20px; background-color: #f4f4f9;">
        <h1 style="color: #333;">Timestamp Microservice API</h1>
        <p>¡El error de ruteo ha sido solucionado! Ahora utilizamos dos rutas explícitas para mayor estabilidad.</p>
        <hr>
        <h2 style="color: #555;">Endpoints de Ejemplo:</h2>
        <ul>
            <li><strong>Hora Actual (Ruta /api):</strong> <a href="/api" target="_blank">/api</a></li>
            <li><strong>Fecha Unix (Ruta /api/fecha):</strong> <a href="/api/1479897600000" target="_blank">/api/1479897600000</a></li>
            <li><strong>Fecha String (Ruta /api/fecha):</strong> <a href="/api/2016-11-23" target="_blank">/api/2016-11-23</a></li>
            <li><strong>Fecha Inválida:</strong> <a href="/api/error-fecha" target="_blank">/api/error-fecha</a></li>
        </ul>
    </body>
  `);
});



app.get('/api/', (req, res) => {
   
    const date = new Date();
    
  
    res.json({
        unix: date.getTime(),      
        utc: date.toUTCString()    
    });
});




app.get('/api/:date', (req, res) => {
    
    let dateString = req.params.date;

    let date;
    
    
    const isUnixTimestamp = /^\d+$/.test(dateString) && dateString.length > 8; 

    if (isUnixTimestamp) {
        
        date = new Date(parseInt(dateString));
    } else {
       
        date = new Date(dateString);
    }


    if (isNaN(date.getTime())) {
        
        res.json({ error: "Invalid Date" });
    } else {
        
        res.json({
            unix: date.getTime(),      
            utc: date.toUTCString()    
        });
    }
});


app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});