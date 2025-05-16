const service = require('../services/product.service');

exports.getAll = async (req, res) => {
  try {
    const products = await service.getAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

exports.getOne = async (req, res) => {
  try {
    const product = await service.getById(req.params.id);
    if (!product)
      return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener producto' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const newProduct = await service.create(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear producto' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updated = await service.update(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await service.remove(req.params.id);
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
};
