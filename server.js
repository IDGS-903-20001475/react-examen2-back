const express = require('express');
const cors = require('cors');
const corsOptions = {
    origin: '*', // Cambia '*' a la URL de tu aplicación de React en producción
    credentials: true,
  };
const data = require('./src/products.json'); 

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors(corsOptions));

// Rutas de ejemplo
app.get('/', (req, res) => {
  res.send('Hola, esta es una ruta de ejemplo.');
});

app.get('/api/items', (req, res) => {
    const query = req.query.q || '';
  
    if (Array.isArray(data.products)) {
      const results = data.products.filter(item => {
        return typeof item.title === 'string' && item.title.toLowerCase().includes(query);
      });
  
      res.json(results);
    } else {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  
  

  app.get('/api/item/:id', (req, res) => {
    const id = req.params.id;
  
    if (Array.isArray(data.products)) {
      const result = data.products.find(item => item.id.toString() === id);
  
      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ error: 'Producto no encontrado' });
      }
    } else {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  
  

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`El servidor está escuchando en el puerto ${PORT}`);
});
