const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.mongo.controller');

// Crear un producto
router.post('/', productController.create);

// Obtener todos los productos
router.get('/', productController.getAll);

// Obtener un producto por ID
router.get('/:id', productController.getById);

// Actualizar un producto por ID
router.put('/:id', productController.update);

// Eliminar un producto por ID
router.delete('/:id', productController.remove);

module.exports = router;
