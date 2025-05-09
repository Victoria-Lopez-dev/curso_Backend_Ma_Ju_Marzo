// Imports
const express = require('express'); // Importamos express

// Routes
const saludoRouter = require('./src/router/saludo.routes');
const itemRouter = require('./src/router/item.routes');
const productosRouter = require('./src/router/productos.routes');

const app = express(); // Creamos la app
const PORT = 3000; // Puerto donde escuchará el servidor

app.use(express.json()); // Middleware para parsear el cuerpo de las peticiones a JSON

app.use(express.static('public')); // Middleware para servir archivos estáticos desde la carpeta 'public'

/**
 * Otra manera de servir archivos estáticos
 *
 * const path = require('path');
 * console.log(__dirname);
 * console.log(path.join(__dirname, '/public'));
 * app.use('/', express.static(path.join(__dirname, 'public')));
 */

app.use('/saludo', saludoRouter);
app.use('/item', itemRouter);
app.use('/productos', productosRouter);

/**
 * Al utilizar el app.use(express.static('public')) esto deja de funcionar
 * colision con la ruta "/"
 */
//app.get('/', (req, res) => {
//  res.send('¡Hola desde Express!');
//});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
