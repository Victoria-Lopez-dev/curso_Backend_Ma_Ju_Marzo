require('dotenv').config();
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const pool = require('./src/config/db.mysql');
const connectDB = require('./src/config/db.mongo');
const mongoose = require('mongoose');
const mailRoutes = require('./src/routes/mail.routes');
const productRoutes = require('./src/routes/product.routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const {
  authenticateToken,
  authorizePermission,
  // authorizeRole,
} = require('./src/middlewares/auth.middleware');
const authRoutes = require('./src/routes/auth.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: '*', // 🔁 O el dominio real de tu frontend
    credentials: true, // ✅ Permite enviar cookies
  })
);

connectDB;

app.use(cookieParser());

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

app.get('/ping-mysql', async (req, res) => {
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

app.get('/ping-mongo', async (req, res) => {
  try {
    const admin = mongoose.connection.db.admin();
    const result = await admin.ping();
    res.status(200).json({ message: '🟢 MongoDB responde', result });
  } catch (err) {
    console.error('❌ Error en ping:', err.message);
    res.status(500).json({
      message: '🔴 Error al conectar con MongoDB',
      error: err.message,
    });
  }
});

app.use('/auth', authRoutes);

app.get('/profile', authenticateToken, (req, res) => {
  res.json({ message: `Hola, ${req.user.username}!`, roles: req.user.roles });
});

app.get(
  '/metrics',
  authenticateToken,
  authorizePermission('metrics:view'),
  (req, res) => {
    res.json({
      message: 'Métricas de rendimiento',
      data: {
        cpuUsage: process.cpuUsage(),
        memoryUsage: process.memoryUsage(),
        uptime: process.uptime(),
      },
    });
  }
);

app.get(
  '/admin/dashboard',
  authenticateToken,
  authorizePermission('dashboard:view'),
  (req, res) => {
    res.json({ message: 'Bienvenido al panel de administración' });
  }
);

app.use('/mongo/product', require('./src/routes/product.mongo.routes'));

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
