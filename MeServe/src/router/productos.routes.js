const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // javascript que consulta la base de datos y devuelve los productos
  res.send('Productos disponibles: 🛒');
});

router.get('/:id', (req, res) => {
  const { id } = req.params; // los parametros se obtienen de req.params que viene en la url
  res.send(`Producto solicitado: ${id} 🧾`);
});

/**
 * 	 {
			"marca": "marolio",
			"cantidad": 10,
			"nombre": "aceite girasol",
			"precio": 1000
		}	
 */
router.post('/', (req, res) => {
  // Cargar un producto
  const datos = req.body;
  console.log('Datos recibidos:', datos);

  res.json({
    mensaje: 'Producto recibido correctamente ✅',
    producto: datos,
  });
});

router.put('/:id', (req, res) => {
  // Modificar un producto
  const { id } = req.params;
  const datos = req.body;
  console.log('Datos recibidos:', datos);

  res.json({
    mensaje: `Producto ${id} modificado correctamente ✅`,
    producto: datos,
  });
});

router.delete('/:id', (req, res) => {
  // Eliminar un producto
  const { id } = req.params;
  console.log('Producto eliminado:', id);

  res.json({
    mensaje: `Producto ${id} eliminado correctamente ✅`,
  });
});

module.exports = router;
