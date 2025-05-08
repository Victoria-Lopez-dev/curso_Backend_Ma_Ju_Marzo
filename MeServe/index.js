// Imports
const express = require('express'); // Importamos express

// Routes
const saludoRouter = require('./src/router/saludo.routes');
const itemRouter = require('./src/router/item.routes');
const productosRouter = require('./src/router/productos.routes');

const app = express(); // Creamos la app
const PORT = 3000; // Puerto donde escuchará el servidor

app.use(express.json()); // Middleware para parsear el cuerpo de las peticiones a JSON

app.use('/saludo', saludoRouter);
app.use('/item', itemRouter);
app.use('/productos', productosRouter);

app.get('/', (req, res) => {
  res.send(
    '¡Hola desde Express! Esta es la ruta raíz. Puedes acceder a /api para ver la API.'
  );
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
