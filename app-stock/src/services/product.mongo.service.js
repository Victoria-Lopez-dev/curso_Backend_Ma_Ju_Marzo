const Product = require('../models/product.model');

// 🟢 Crear un producto
const createProduct = async (data) => {
  const product = new Product(data);
  return await product.save();
};

// 📄 Obtener todos los productos
const getAllProducts = async () => {
  return await Product.find();
};

// 🔍 Obtener un producto por ID
const getProductById = async (id) => {
  return await Product.findById(id);
};

// ✏️ Actualizar un producto por ID
const updateProduct = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

// 🗑️ Eliminar un producto por ID
const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
