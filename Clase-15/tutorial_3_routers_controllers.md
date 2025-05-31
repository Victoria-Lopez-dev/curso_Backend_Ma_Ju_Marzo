# 🚀 Mejora tu servidor Node.js + Express

¡Bienvenido a la segunda parte del viaje! En este tutorial continuaremos desarrollando habilidades fundamentales para construir APIs con **Node.js + Express**. Si ya completaste el tutorial anterior, estás listo para llevar tu servidor al siguiente nivel. Hoy veremos:

🔗 Cómo manejar **parámetros dinámicos en rutas**  
🔐 Cómo **validar datos** enviados por el cliente  
🧩 Cómo **separar controladores** para una mejor organización del código

---

## 🔗 1. Parámetros dinámicos en rutas

En Express, podemos definir rutas que contienen **parámetros variables**, lo que nos permite manejar recursos de forma dinámica.

### 📌 ¿Qué son los parámetros dinámicos?

Los parámetros dinámicos se definen en la URL con el símbolo `:` y se acceden usando `req.params`.

### 📁 Ejemplo básico

```javascript
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/usuarios/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`🧑‍💻 Perfil del usuario con ID: ${userId}`);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
```

### 🔍 ¿Qué está pasando?

- La ruta `/usuarios/:id` acepta cualquier valor en lugar de `:id`.
- Ese valor queda disponible en `req.params.id`.

### 🧪 Probalo

Iniciá el servidor y visitá en tu navegador:

```bash
http://localhost:3000/usuarios/42
```

Verás:

```
🧑‍💻 Perfil del usuario con ID: 42
```

---

## 🔐 2. Validación de datos recibidos en el body

Cuando los usuarios envían datos (por ejemplo, al crear una cuenta), es importante **validar** que la información sea correcta y segura antes de procesarla.

### 📦 Middleware necesario

Primero, asegurate de que tu servidor puede leer JSON desde el body de las peticiones:

```javascript
const express = require('express');
const app = express();

app.use(express.json()); // 📦 Habilita la lectura de JSON
```

### ✅ Validación manual

Un enfoque simple para validar un campo `nombre`:

```javascript
app.post('/registro', (req, res) => {
  const { nombre } = req.body;

  if (!nombre || nombre.length < 3) {
    return res.status(400).json({
      error: '⚠️ El nombre es obligatorio y debe tener al menos 3 caracteres',
    });
  }

  res.status(200).json({ mensaje: `👋 Hola, ${nombre}!` });
});
```

### 🧪 Probalo

Podés usar herramientas como Postman o `curl` para enviar un POST:

```bash
curl -X POST http://localhost:3000/registro   -H "Content-Type: application/json"   -d '{"nombre": "Ana"}'
```

---

### 🔧 Validación con express-validator

Para validaciones más completas y reutilizables, instalá este paquete:

```bash
npm install express-validator
```

### 📁 Ejemplo usando `check` y `validationResult`:

```javascript
const { check, validationResult } = require('express-validator');

app.post(
  '/registro',
  [
    check('nombre').notEmpty().withMessage('⚠️ El nombre es obligatorio'),
    check('nombre')
      .isLength({ min: 3 })
      .withMessage('⚠️ El nombre debe tener al menos 3 caracteres'),
  ],
  (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }

    const { nombre } = req.body;
    res.status(200).json({ mensaje: `🎉 Registro exitoso: ${nombre}` });
  }
);
```

---

## 🧩 3. Separar controladores para organizar mejor tu servidor

### 📁 Estructura sugerida

```
📦 mi-servidor/
├── 📁 controllers/
│   └── usuarioController.js
├── 📁 routes/
│   └── usuarios.js
├── app.js
```

---

### 🧠 Paso 1: Crear el controlador

## 🎛️ ¿Qué son los controladores en Express?

En el desarrollo web (especialmente con Express), un **controlador** es simplemente una **función que se encarga de manejar una solicitud** específica.

Su responsabilidad es:

- 📥 Recibir y procesar datos de la solicitud (`req`)
- 📤 Preparar y enviar una respuesta (`res`)
- 🧠 Ejecutar la lógica necesaria para cumplir con lo que se espera de esa ruta (como buscar en una base de datos, validar datos, etc.)

---

### 🎭 Analogía: el restaurante

Imaginá que Express es un restaurante 🍽️:

- El **router** es el camarero que toma la orden del cliente.
- El **controlador** es el cocinero que prepara la comida.
- El **modelo** sería la heladera o la base de datos donde están los ingredientes.

Entonces, cada vez que llega una orden (una solicitud HTTP), el camarero (router) dice:  
📣 “¡Una ruta GET a /usuarios/1!”  
Y el cocinero (controlador) responde:  
👨‍🍳 “¡Enseguida, preparando la respuesta con los datos del usuario 1!”

---

### 🗂️ ¿Por qué separar los controladores?

Porque mejora:

✅ **La organización** (cada archivo tiene su propósito)  
🧼 **La limpieza del código** (menos líneas por archivo)  
🔁 **La reutilización** de lógica en distintas rutas  
🧪 **La testabilidad** (es más fácil probar funciones sueltas)

---

### 🧱 Ejemplo comparativo

**Sin controlador (todo en la ruta):**

```javascript
app.get('/productos', (req, res) => {
  const productos = obtenerDesdeBaseDeDatos();
  res.json(productos);
});
```

**Con controlador:**

📄 `controllers/productoController.js`

```javascript
exports.obtenerProductos = (req, res) => {
  const productos = obtenerDesdeBaseDeDatos();
  res.json(productos);
};
```

📄 `routes/productos.js`

```javascript
const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

router.get('/', productoController.obtenerProductos);

module.exports = router;
```

📄 `controllers/usuarioController.js`

```javascript
exports.mostrarPerfil = (req, res) => {
  const id = req.params.id;
  res.send(`🧑‍💻 Perfil del usuario con ID: ${id}`);
};

exports.crearUsuario = (req, res) => {
  const { nombre } = req.body;
  res.send(`✅ Usuario ${nombre} creado con éxito`);
};
```

---

### 🔗 Paso 2: Crear archivo de rutas

📄 `routes/usuarios.js`

```javascript
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/:id', usuarioController.mostrarPerfil);
router.post('/', usuarioController.crearUsuario);

module.exports = router;
```

---

### 🧩 Paso 3: Usar las rutas en app.js

📄 `app.js`

```javascript
const express = require('express');
const app = express();
const PORT = 3000;

const rutasUsuarios = require('./routes/usuarios');

app.use(express.json());
app.use('/usuarios', rutasUsuarios);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
```

---

## ✅ Conclusión

Ahora tenés un servidor mucho más organizado y profesional:

🔗 Rutas dinámicas con `req.params`  
🔐 Validación de datos del cliente  
🧩 Lógica separada en controladores

¡Felicitaciones! 🎉 Estás listo para construir APIs más escalables y fáciles de mantener.
