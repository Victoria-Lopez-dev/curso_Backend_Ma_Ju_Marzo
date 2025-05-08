const express = require('express');
const router = express.Router();

const mockData = [
  { id: 1, saludo: 'Hola' },
  { id: 2, saludo: 'Hola desde la API' },
  { id: 3, saludo: 'Hola desde la API con Express' },
  { id: 4, saludo: 'Hola desde la API con Express y MongoDB' },
  { id: 5, saludo: 'Hola desde la API con Express y MongoDB y Mongoose' },
  {
    id: 6,
    saludo: 'Hola desde la API con Express y MongoDB y Mongoose y Docker',
  },
  {
    id: 7,
    saludo:
      'Hola desde la API con Express y MongoDB y Mongoose y Docker y Docker Compose',
  },
];

router.get('/', (req, res) => {
  res.send('GET: ¡Hola desde /saludo! 👋');
});

router.post('/', (req, res) => {
  const { id } = req.body;
  console.log('ID recibido:', id);

  // Simulamos una consulta a la base de datos
  const saludoResponse = mockData.filter((item) => item.id == id);
  console.log('Saludo encontrado:', saludoResponse);

  if (saludoResponse.length > 0) {
    res.json({
      mensaje: 'Saludo encontrado correctamente ✅',
      saludo: saludoResponse[0].saludo,
    });
  } else {
    res.status(404).send('POST: ¡Saludo no encontrado! ❌');
  }
});

module.exports = router;
