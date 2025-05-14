const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const mailRoutes = require('./src/routes/mail.routes');

const app = express();
const PORT = 3000;

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

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
