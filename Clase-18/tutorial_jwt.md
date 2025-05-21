# 🛡️ Autenticación con JWT y Roles en Node.js + Express + MySQL

## 🔍 ¿Qué vamos a construir?

Un sistema de autenticación y autorización para tu servidor Express que permite:

- ✅ Registro y login de usuarios con contraseñas encriptadas.
- 🔐 Emisión y verificación de JWT.
- 🧑‍💻 Asignación de roles (user / admin).
- 🚫 Restricción de rutas según roles.

---

## 🧠 Conceptos clave

### 🔐 ¿Qué es JWT (JSON Web Token)?

JWT (JSON Web Token) es un estándar para transmitir información de manera segura entre dos partes. Se usa comúnmente para autenticación. Un JWT contiene:

- Header (tipo y algoritmo)

- Payload (datos como id, nombre, rol)

- Signature (firma que garantiza que el token no fue modificado)

🧾 ¿Para qué sirve en nuestro caso?
Permite que, tras hacer login, el servidor genere un token con los datos del usuario. Este token se envía con cada petición para verificar que el usuario está autenticado.

### 🔏 ¿Qué es bcrypt?

Es una biblioteca para encriptar contraseñas de forma segura. En vez de guardar la contraseña directamente en la base de datos, se guarda una versión encriptada.

✅ Así evitamos que, si alguien accede a la DB, vea las contraseñas reales.

#### 🔐 ¿Por qué encriptar contraseñas?

Nunca guardamos contraseñas planas. Usamos `bcryptjs` para encriptarlas con un hash.

---

## 📘 ¿Cómo funciona el sistema final? (paso a paso)

1. 🧑 Un usuario se registra → ✍️ su contraseña se encripta con bcrypt y se guarda en la base de datos junto con el rol (por defecto: `user`).

2. 🧑 Un usuario hace login → si la contraseña coincide con la encriptada, se genera un 🔐 `JWT` con su `id` y `rol`, al cual llamaremos `TOKEN`. Este es enviado al cliente (por ejemplo, un navegador o app móvil).

3. ✅ En las siguientes peticiones, el cliente envía el `TOKEN` en los **headers**. El servidor lo **verifica** en cada ruta protegida.

4. 🛡️ Algunas rutas requieren tener el rol `admin` y serán **restringidas** para usuarios comunes (`user`).

## 📦 Instalación de dependencias necesarias

```bash
npm install jsonwebtoken bcryptjs
```

- bcryptjs: encripta y compara contraseñas.
- jsonwebtoken: genera y verifica tokens JWT.

---

### 📁 Estructura de carpetas sugerida (resumen):

```
src/
│
├── config/
│ 	└── db.js # Pool de conexiones
├── controllers/
│   └── auth.controller.js       ← Registro y login
├── middlewares/
│   ├── auth.middleware.js       ← Verifica token JWT
│   └── role.middleware.js       ← Verifica si es admin
├── routes/
│   └── auth.routes.js
└── app.js / server.js
```

---

## 🔧 Variables de entorno necesarias

Agrega a tu archivo `.env`:

```env
JWT_SECRET=miclaveultrasecreta
JWT_EXPIRES=1d
```

Ejemplos alternativos para `JWT_EXPIRES`:

### ⏳ Ejemplos de expiración de tokens con expiresIn

El campo `expiresIn` puede aceptar valores en **segundos** o con **sufijos de tiempo**:

| Tiempo                         | Valor `expiresIn`                    |
| ------------------------------ | ------------------------------------ |
| 30 segundos                    | `'30s'`                              |
| 10 minutos                     | `'10m'`                              |
| 1 hora                         | `'1h'`                               |
| 12 horas                       | `'12h'`                              |
| 1 día (recomendado para login) | `'1d'`                               |
| 7 días                         | `'7d'`                               |
| 1 mes aprox.                   | `'30d'`                              |
| Permanente (NO recomendado)    | sin `expiresIn` o con valor muy alto |

> 📌 Recomendación: Usa `'1h'` o `'1d'` para sesiones de usuarios comunes. Si es una API pública o sensible, lo ideal es corto (`'15m'` a `'1h'`) con refresh tokens.

---

## 🗃️ Estructura SQL inicial

```sql
-- Crear tabla de roles primero
CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- Insertar roles básicos si no existen
INSERT IGNORE INTO roles (name) VALUES ('admin'), ('user');

-- Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de user x roles
CREATE TABLE IF NOT EXISTS user_roles (
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Trigger para asignar role user por defecto
DELIMITER $$

CREATE TRIGGER assign_user_role
AFTER INSERT ON users
FOR EACH ROW
BEGIN
  DECLARE userRoleId INT;

  -- Buscar ID del rol 'user'
  SELECT id INTO userRoleId FROM roles WHERE name = 'user' LIMIT 1;

  -- Si lo encontró, insertamos
  IF userRoleId IS NOT NULL THEN
    INSERT INTO user_roles (user_id, role_id) VALUES (NEW.id, userRoleId);
  END IF;
END$$

DELIMITER ;


```

📌 Explicación rápida:

- username, email: deben ser únicos.
- password: se guarda encriptada.
- role: es un campo ENUM, que solo acepta 'user' o 'admin'.
- created_at: para saber cuándo se registró el usuario.

---

## ✍️ Registro de usuario

### 📁 `controllers/auth.controller.js`

```js
const bcrypt = require('bcryptjs');
const pool = require('../config/db');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: 'Todos los campos son obligatorios.' });
  }

  try {
    // Verificar si ya existe el usuario
    const [existing] = await pool.query(
      'SELECT id FROM users WHERE email = ? OR username = ?',
      [email, username]
    );
    if (existing.length > 0) {
      return res
        .status(409)
        .json({ message: 'Usuario o email ya registrado.' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar el nuevo usuario
    const [userResult] = await pool.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );

    res
      .status(201)
      .json({ message: 'Usuario registrado', userId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar usuario', details: err });
  }
};
```

---

## 🔐 Login y generación de JWT

### 📁 `controllers/auth.controller.js`

> ⚠️ Recordá: siempre dar una respuesta genérica si algo falla para no dar pistas a posibles atacantes (“Credenciales inválidas” en lugar de “usuario no encontrado”).

```js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // Asegurate de que esté importado
const pool = require('../config/db');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Validación básica
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Email y contraseña son requeridos.' });
  }

  try {
    // 1️⃣ Ejecutar query para traer usuario + roles (JOIN)
    const [rows] = await pool.query(
      `SELECT u.id, u.username, u.password, r.name AS role
       FROM users u
       LEFT JOIN user_roles ur ON u.id = ur.user_id
       LEFT JOIN roles r ON ur.role_id = r.id
       WHERE u.email = ?`,
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // 2️⃣ Extraer los datos del usuario (solo se repite id, username, password)
    const { id, username, password: hashedPassword } = rows[0]; // <- extrae el password y lo guarda en hashedPassword

    // 3️⃣ Verificar contraseña con bcrypt
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // 4️⃣ Extraer los roles desde el resultado del JOIN
    const roles = rows.map((row) => row.role).filter(Boolean); // Remueve posibles `null`

    // 5️⃣ Generar el token JWT
    const token = jwt.sign(
      { id, username, roles }, // <- payload que codificás dentro del token
      process.env.JWT_SECRET, // <- clave secreta para firmar
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' } // <- duración del token
    );

    // 6️⃣ Devolver el token al frontend
    res.status(200).json({ message: 'Login exitoso', token });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ message: 'Error del servidor.' });
  }
};
```

### 📁 `routes/auth.routes.js`

> Agregamos `register` & `login`

```js
const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/auth.controller');

router.post('/register', register);
router.post('/login', login);

module.exports = router;
```

---

## 🛡️ Middleware de autenticación y autorización

### ¿Qué es un middleware?

🧩 Un middleware en Express es una función que se ejecuta antes de que una ruta final responda al cliente. Puede hacer tareas como:

- Verificar que haya un token válido (autenticación)

- Verificar que el usuario tenga un rol permitido (autorización)

- Validar datos del cuerpo de la petición

- Registrar logs de uso

- Manipular la respuesta o continuar hacia el siguiente middleware

🧠 Se ejecutan en orden y tienen acceso a req, res y una función next() que los conecta en cadena. Si un middleware no llama a next(), la ejecución se detiene ahí.

📦 En este sistema usamos dos:

- authenticateToken: verifica que el token JWT sea válido.

- authorizeRole: verifica si el usuario tiene el rol adecuado.

### 📁 `middlewares/auth.middleware.js`

```js
const jwt = require('jsonwebtoken');

// ✅ Middleware: Verifica que el token JWT sea válido
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1]; // Espera formato "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, userData) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido o expirado.' });
    }

    // Guardamos los datos del usuario en req.user para usarlo en siguientes middlewares
    req.user = userData;
    next();
  });
};

// ✅ Middleware: Verifica que el usuario tenga al menos uno de los roles requeridos
const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    const userRoles = req.user?.roles || [];

    // Verifica si al menos uno de los roles del usuario está en los roles permitidos
    const hasRole = userRoles.some((role) => allowedRoles.includes(role));

    if (!hasRole) {
      return res
        .status(403)
        .json({ message: 'No tienes permisos suficientes.' });
    }

    next();
  };
};

module.exports = {
  authenticateToken,
  authorizeRole,
};
```

### 🧪 Ejemplo de uso en rutas:

```js
const express = require('express');
const router = express.Router();
const {
  authenticateToken,
  authorizeRole,
} = require('./src/middlewares/auth.middleware');

router.get('/profile', authenticateToken, (req, res) => {
  res.json({ message: `Hola, ${req.user.username}!`, roles: req.user.roles });
});

router.get(
  '/admin/dashboard',
  authenticateToken,
  authorizeRole('admin'),
  (req, res) => {
    res.json({ message: 'Bienvenido al panel de administración' });
  }
);
```

### 🧪 Ejemplo de uso en rutas practico (Productos):

- Solo **admins** pueden crear, actualizar o borrar productos.
- Los **usuarios normales (user)** solo pueden obtener uno o todos los productos.

Vamos a definir las rutas del CRUD con los middlewares `authenticateToken` y `authorizeRole` para cumplir con ese requerimiento.

#### 📁 Ejemplo con Express - `routes/products.js`

```js
const express = require('express');
const router = express.Router();
const {
  authenticateToken,
  authorizeRole,
} = require('../middlewares/auth.middleware');

// Rutas públicas protegidas: usuarios autenticados pueden ver productos
router.get('/', productsController.getAll);
router.get('/:id', productsController.getById);

// Rutas restringidas solo a admin para modificar productos
router.post(
  '/',
  authenticateToken,
  authorizeRole('admin'),
  productsController.create
);
router.put(
  '/:id',
  authenticateToken,
  authorizeRole('admin'),
  productsController.update
);
router.delete(
  '/:id',
  authenticateToken,
  authorizeRole('admin'),
  productsController.delete
);

module.exports = router;
```

- `GET /products` y `GET /products/:id` están abiertas al público.

- `POST`, `PUT`, `DELETE` están protegidas y requieren token + rol admin.
