---
## 🍃 ¿Con MongoDB cómo sería?

Si decidís usar **MongoDB** en lugar de **MySQL**, vas a tener que hacer varios cambios en tu proyecto. A continuación te muestro **exactamente** qué deberías modificar:
---

### 🔁 Diferencias clave entre MySQL y MongoDB

| Sección                | MySQL                           | MongoDB (Mongoose)                            |
| ---------------------- | ------------------------------- | --------------------------------------------- |
| 📦 Paquete de conexión | `mysql2`                        | `mongoose`                                    |
| 🔌 Conexión            | Pool con `createPool()`         | Conexión directa con `mongoose.connect()`     |
| 📁 Service             | Uso de `pool.query()` con SQL   | Uso de métodos de modelo (`Model.find`, etc.) |
| 📄 Modelo de datos     | No se usa (SQL directo)         | Se define un **schema** con Mongoose          |
| 📚 Queries             | SQL crudo (`SELECT \* FROM...`) | Consultas con métodos de Mongoose             |

---

### 1. 📦 Instalar dependencia

Ejecuta este comando en tu terminal:

```bash
npm install mongoose
```

### 2. Actualizar tu `.env`

```env
MONGO_USER=root
MONGO_PASSWORD=mongopassword
MONGO_HOST=localhost
MONGO_PORT=27017
MONGO_DB=stock_db
```

o usando `URI`

```env
MONGO_URI=mongodb://root:mongopassword@localhost:27017/stock_db?authSource=admin
```

---

### 3. 🔌 Conectar a MongoDB

📄 `config/database.js`

```js
const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ Conectado a MongoDB');
  })
  .catch((err) => {
    console.error('❌ Error de conexión a MongoDB', err);
  });
```

---

### 4. 🧠 Usar connectDB en tu archivo principal (app.js o index.js)

Adicionalmente vamos a agregar un endpoint probar la conexión con un `ping a MongoDB`.

```js

const connectDB = require('./config/database');
const mongoose = require('mongoose');
...
// Conectar a MongoDB
connectDB();
...

app.get('/ping-db', async (req, res) => {
  try {
    const admin = mongoose.connection.db.admin();
    const result = await admin.ping();
    res.status(200).json({ message: '🟢 MongoDB responde', result });
  } catch (err) {
    console.error('❌ Error en ping:', err.message);
    res.status(500).json({ message: '🔴 Error al conectar con MongoDB', error: err.message });
  }
});

```

---

### 5. 🧱 Definir el modelo `Product`

📄 `models/Product.js`

```js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
    },
    price: {
      type: Number,
      required: [true, 'El precio es obligatorio'],
      min: [0, 'El precio no puede ser negativo'],
    },
    description: {
      type: String,
      default: '',
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, 'El stock no puede ser negativo'],
    },
  },
  {
    timestamps: true, // Crea createdAt y updatedAt
  }
);

module.exports = mongoose.model('Product', productSchema);
```

#### ✅ Cosas que cubre este modelo:

- Validaciones básicas (required, min)

- timestamps automáticos

- Valor por defecto para description y stock

---

### 6. 🛠️ Service con operaciones CRUD

📁 `services/productService.js`

```js
const Product = require('../models/Product.model');

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
```

---

### 7. 🎮 Controlador con manejo de errores

⚙️ `controllers/product.controller.js`

```js
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../services/product.service');

// 🟢 Crear producto
exports.create = async (req, res) => {
  try {
    const product = await createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 📄 Obtener todos los productos
exports.getAll = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔍 Obtener producto por ID
exports.getById = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✏️ Actualizar producto
exports.update = async (req, res) => {
  try {
    const product = await updateProduct(req.params.id, req.body);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 🗑️ Eliminar producto
exports.remove = async (req, res) => {
  try {
    const product = await deleteProduct(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
```

---

### 8. 🛣️ Router

🛣️ routes/product.routes.js

```js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

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
```

🧩 Asegurate de tener esto en tu app.js o index.js:

```js
app.use('/api/products', require('./src/routes/product.routes'));
```

Con esto, tus endpoints quedarían:

- POST /api/products → crear producto

- GET /api/products → listar productos

- GET /api/products/:id → obtener producto por ID

- PUT /api/products/:id → actualizar producto

- DELETE /api/products/:id → eliminar producto

### 9. 🧪 Test

#### 🔨 1. Crear producto (POST)

**POST** `http://localhost:3000/api/products`

```json
{
  "name": "Camiseta React",
  "price": 3500,
  "description": "Remera negra con logo de React",
  "stock": 15
}
```

#### 📋 2. Obtener todos los productos (GET)

**GET** `http://localhost:3000/api/products`

#### 🔍 3. Obtener producto por ID (GET)

**GET** `http://localhost:3000/api/products/<ID_DEL_PRODUCTO>`

_Reemplazá <ID_DEL_PRODUCTO> con el que obtuviste del paso 1 o 2._

#### ✏️ 4. Actualizar producto (PUT)

**PUT** `http://localhost:3000/api/products/<ID_DEL_PRODUCTO>`

```json
{
  "price": 4200,
  "stock": 10
}
```

#### 🗑️ 5. Eliminar producto (DELETE)

**DELETE** `http://localhost:3000/api/products/<ID_DEL_PRODUCTO>`

⚠️ **Notas rápidas para evitar errores:**

- Asegurate que Content-Type esté en application/json.
- Si usás un ID inválido o no existe, deberías recibir 404.
- El campo price no acepta valores negativos (lo valida Mongoose).
