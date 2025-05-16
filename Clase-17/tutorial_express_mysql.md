# 🛒 API REST - Stock de Productos con Node.js + Express + MySQL

Este proyecto es una API para gestionar el stock de productos, utilizando una arquitectura escalable basada en **router**, **controller**, **service** y **base de datos**.

---

## 📦 Tecnologías utilizadas

- Node.js
- Express
- MySQL
- `mysql2`
- `dotenv`

---

## ⚙️ Requisitos

- Node.js
- MySQL
- Postman, Insomnia, Thunder Client
- Editor de código (por ejemplo, VS Code)

---

## 📁 Estructura del Proyecto

```
api-stock/
│
├── src/
│ └── config/
│ │		└── db.js # Pool de conexiones
│ │
│ └── controllers/
│ │		└── product.controller.js
│ │
│ └── routes/
│ │		└── product.routes.js
│ │
│ └── services/
│ 		└── product.service.js
│
├── .env # Variables de entorno
├── server.js # Archivo principal
└── schema.sql # SQL para crear la base de datos
```

---

## ⚙️ Instalación

```bash
npm init -y
npm install express mysql2 dotenv
npm install -D nodemon
```

---

## 🗃️ Definición de la Base de Datos (MySQL)

```sql
-- Create database if not exists
CREATE DATABASE IF NOT EXISTS stock_db;
USE stock_db;

-- Create categories table
CREATE TABLE categories (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(50) NOT NULL
);

-- Create products table with foreign key to categories
CREATE TABLE products (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	quantity INT NOT NULL,
	category_id INT,
	CONSTRAINT fk_category
		FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Insert default categories
INSERT INTO categories (name) VALUES
('Clothing'),
('Footwear'),
('Accessories');

-- Insert default products with category references
INSERT INTO products (name, price, quantity, category_id) VALUES
('Basic White T-Shirt', 2500.00, 100, 1),
('Blue Jeans', 7800.50, 50, 1),
('Running Sneakers', 14500.99, 30, 2),
('Adjustable Black Cap', 1800.75, 80, 3),
('Waterproof Jacket', 21500.00, 20, 1);

```

---

## 🔐 ¿Qué es `.env`?

El archivo `.env` nos permite definir variables de entorno, como credenciales de la base de datos, puerto, y otros valores sensibles. Esto separa la configuración del código fuente.

### Ejemplo:

```
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=stock_db
```

## 🗂️ Archivo `.env.example`

Es una **plantilla** de las variables de entorno necesarias para ejecutar el proyecto. Sirve como guía para que otros desarrolladores sepan qué variables configurar sin revelar información sensible.

📄 **`.env.example`**

```env
PORT=
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
```

> ⚠️ Asegurate de ignorar este archivo en `.gitignore` para no subirlo a repositorios públicos.

📄 **`.gitignore`**

```
node_modules
.env
```

✅ Esto mejora la seguridad y facilita el trabajo colaborativo en equipo.

---

## 🚘 Configuración de la base de datos - `config/db.js`

```js
require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool.promise();
```

---

## ✍️ Punto de entrada - `server.js`

```js
require('dotenv').config();
const express = require('express');
const productRouter = require('./src/routes/product.routes');

const app = express();
app.use(express.json());

app.use('/products', productRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
```

---

## 🧩 Rutas - `routes/product.routes.js`

```js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/product.controller');

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.post('/', controller.createProduct);
router.put('/:id', controller.updateProduct);
router.delete('/:id', controller.deleteProduct);

module.exports = router;
```

---

## 🎮 Controlador - `controllers/product.controller.js`

```js
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
```

---

## 🔧 Servicio - `services/product.service.js`

```js
const pool = require('../config/db');

exports.getAll = async () => {
  const [rows] = await pool.query(`
    SELECT 
      p.id, 
      p.name, 
      p.price, 
      p.quantity, 
      p.category_id, 
      c.name AS category_name
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
  `);
  return rows;
};

exports.getById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT 
      p.id, 
      p.name, 
      p.price, 
      p.quantity, 
      p.category_id, 
      c.name AS category_name
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.id = ?
  `,
    [id]
  );
  return rows[0];
};
exports.create = async ({ name, price, quantity, category_id }) => {
  const [result] = await pool.query(
    'INSERT INTO products (name, price, quantity, category_id) VALUES (?, ?, ?, ?)',
    [name, price, quantity, category_id]
  );
  return { id: result.insertId, name, price, quantity, category_id };
};

exports.update = async (id, { name, price, quantity, category_id }) => {
  await pool.query(
    'UPDATE products SET name = ?, price = ?, quantity = ?, category_id = ? WHERE id = ?',
    [name, price, quantity, category_id, id]
  );
  return { id, name, price, quantity, category_id };
};

exports.remove = async (id) => {
  await pool.query('DELETE FROM products WHERE id = ?', [id]);
  return { deleted: true };
};
```

---

## ❌ Ejemplo sin pool de conexiones

```js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'stock_db',
});

connection.query('SELECT * FROM products', (err, results) => {
  if (err) throw err;
  console.log(results);
  connection.end(); // Cerrado manual
});
```

> ⚠️ Este método es menos eficiente para aplicaciones con múltiples peticiones simultáneas, ya que no reutiliza conexiones.

---

## ✅ Endpoints disponibles

| Método | Ruta          | Descripción                |
| ------ | ------------- | -------------------------- |
| GET    | /products     | Listar todos los productos |
| GET    | /products/:id | Obtener producto por ID    |
| POST   | /products     | Crear un nuevo producto    |
| PUT    | /products/:id | Actualizar un producto     |
| DELETE | /products/:id | Eliminar un producto       |

---

## 🛡️ Seguridad: Prevención de SQL Injection

### 🚨 Ejemplo vulnerable (¡NO hacer!)

```json
{
  "nombre": "papas' OR '1'='1"
}
```

Y este código:

```js
const nombre = req.body.nombre;
const query = `SELECT * FROM productos WHERE nombre = '${nombre}'`;
pool.query(query);
```

🧨 Este ataque devuelve toda la tabla porque `'1'='1'` siempre es verdadero.

---

### ✅ Solución segura

```js
const nombre = req.body.nombre;
const [rows] = await pool.query('SELECT * FROM productos WHERE nombre = ?', [
  nombre,
]);
```

✔️ Esta forma usa **consultas parametrizadas**, lo que impide la inyección.

---

### 🧰 Buenas prácticas de seguridad

- 🧩 Usá siempre `?` en las consultas y pasá los datos como arreglo.
- 🧼 Validá y sanitizá los datos del usuario.
- 🧊 No devuelvas errores internos al cliente.
- 🛡️ Usá variables de entorno (`.env`) para ocultar credenciales.
- 🛡️ Implementá roles/permisos para controlar acceso a endpoints sensibles.
