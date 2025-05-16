require('dotenv').config();
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const pool = require('./src/config/db');
const mailRoutes = require('./src/routes/mail.routes');
const productRoutes = require('./src/routes/product.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.engine(
  'handlebars',
  exphbs.engine({
    partialsDir: './src/views',
    defaultLayout: false,
  })
);

// Configuración de Handlebars
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'src/views'));

// Middlewares
app.use(express.json());

// Rutas
app.use('/', mailRoutes);
app.use('/product', productRoutes);

app.get('/ping', async (req, res) => {
  try {
    const result = await pool.query('SELECT now()');
    res.status(200).json({
      status: 'success',
      message: 'Pong!',
      data: result[0],
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al ejecutar la consulta',
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
