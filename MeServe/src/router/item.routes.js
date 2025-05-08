const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('GET: Obteniendo item');
});

router.post('/', (req, res) => {
  res.send('POST: Creando nuevo item');
});

router.put('/', (req, res) => {
  res.send('PUT: Actualizando item');
});

router.delete('/', (req, res) => {
  res.send('DELETE: Eliminando item');
});

module.exports = router;
