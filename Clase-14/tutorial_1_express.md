# 🚀 Introducción: Construyendo tu primer servidor con Node.js + Express

Bienvenido al mundo de Node.js y Express ⚡. En este tutorial vas a construir una **API REST básica** que te servirá de base para proyectos más grandes. El foco está en aprender:

- 🔁 Cómo funcionan las **rutas**
- 💬 Qué son los **verbos HTTP**
- 🧱 Cómo **servir archivos estáticos** como HTML, CSS y JS
- 📦 Cómo enviar y recibir JSON con `req.body`
- ♻️ Cómo usar `nodemon` para desarrollo eficiente
- 🧩 Cómo organizar tus rutas usando `express.Router()`

---

## 🧰 Requisitos Previos

Antes de comenzar, asegurate de tener instalado:

- [Node.js](https://nodejs.org/) ✅
- Un editor de código (recomendado: [VS Code](https://code.visualstudio.com/)) 💻
- Conocimientos básicos de JavaScript y terminal 🧠

---

## 1️⃣ Inicializando el Proyecto

Empezamos creando una carpeta de proyecto y configurando nuestro entorno:

```bash
mkdir mi-api
cd mi-api
npm init -y  # Genera package.json
npm install express  # Instala el framework Express
touch index.js
```

---

## 2️⃣ Creando un Servidor Básico con Express

**index.js**

```javascript
const express = require('express'); // Importamos express
const app = express(); // Creamos la app
const PORT = 3000; // Puerto donde escuchará el servidor

// app.use(express.json()); // Habilita parsing de JSON en el body
// app.use(express.static('public')); // Archivos estáticos

app.get('/', (req, res) => {
  res.send('¡Hola desde Express! 😄');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
```

> Para probar que todo esta correcto, guardamos y corremos en terminal

```bash
node index.js
```

---

## 3️⃣ 🗺️ Entendiendo las Rutas

### Ejemplo de rutas:

```javascript
app.get('/saludo', (req, res) => {
  res.send('Hola desde /saludo 👋');
});

app.get('/contacto', (req, res) => {
  res.send('Página de contacto 📞');
});

app.get('/productos', (req, res) => {
  res.send('Lista de productos 🛒');
});
```

---

## 4️⃣ ⚔️ Verbos HTTP y Rutas Dinámicas

Las **rutas** y los **verbos HTTP** permiten definir cómo responde tu servidor ante distintas peticiones.

### 🧪 Verbos HTTP Básicos

```javascript
app.get('/api/item', (req, res) => {
  res.send('GET: Obteniendo item');
});

app.post('/api/item', (req, res) => {
  res.send('POST: Creando nuevo item');
});

app.put('/api/item', (req, res) => {
  res.send('PUT: Actualizando item');
});

app.delete('/api/item', (req, res) => {
  res.send('DELETE: Eliminando item');
});
```

---

## 🛣️ Rutas Dinámicas y Parámetros

Las rutas dinámicas permiten capturar valores desde la URL usando los **dos puntos** (`:`). Por ejemplo:

### 📍 Parámetros en la URL (`req.params`)

```javascript
app.get('/api/productos/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Producto solicitado: ${id} 🧾`);
});
```

- Si visitás: `http://localhost:3000/api/productos/123`
- El servidor responde: `Producto solicitado: 123 🧾`

### 🧭 Parámetros de consulta (`req.query`)

Usá `req.query` para leer parámetros que vienen después del signo de pregunta `?`.

```javascript
app.get('/api/busqueda', (req, res) => {
  const { q } = req.query;
  res.send(`Buscando: ${q} 🔎`);
});
```

- Si visitás: `http://localhost:3000/api/busqueda?q=notebook`
- El servidor responde: `Buscando: notebook 🔎`

---

## 5️⃣ 🧱 Servir Archivos Estáticos

Express puede servir archivos estáticos como **HTML, CSS, JS, imágenes, etc.** desde una carpeta pública. Para eso usamos:

```javascript
app.use(express.static('public'));
```

Esto le dice a Express:  
👉 "Todo lo que esté en la carpeta `public`, servilo directamente cuando alguien acceda al servidor."

---

### 📁 Estructura del proyecto

Tu estructura debería verse así:

```
mi-api/
├── index.js
├── public/
│   ├── index.html
│   ├── estilo.css
│   └── app.js
```

---

**public/index.html**

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Servidor Express</title>
    <link rel="stylesheet" href="estilo.css" />
  </head>
  <body>
    <h1>Hola desde Express 🌍</h1>
    <p>Esta es una página servida por el servidor Node.js</p>
    <script src="app.js"></script>
  </body>
</html>
```

**public/estilo.css**

```css
body {
  background-color: #fafafa;
  font-family: Arial, sans-serif;
  color: #333;
  text-align: center;
  padding: 50px;
}
```

**public/app.js**

```javascript
console.log('El archivo JavaScript se cargó correctamente 🧠');
```

---

### 🌐 ¿Cómo accedo a esta página?

1. Asegurate de tener corriendo el servidor (`npm run dev`)
2. Abrí tu navegador y visitá:

```bash
http://localhost:3000/
```

Esto carga automáticamente `public/index.html`.

---

### 💡 ¿Y los otros archivos?

- `http://localhost:3000/estilo.css` 👉 Sirve el CSS
- `http://localhost:3000/app.js` 👉 Sirve el JavaScript

## No hace falta crear rutas específicas para esos archivos, Express los sirve automáticamente.

## 📦 Enviando y Recibiendo JSON con `req.body`

```javascript
app.post('/api/usuario', (req, res) => {
  const datos = req.body;
  console.log('Datos recibidos:', datos);

  res.json({
    mensaje: 'Usuario recibido correctamente ✅',
    usuario: datos,
  });
});
```

---

## ♻️ Usando `nodemon` para recargar automáticamente

### Instalación

```bash
npm install --save-dev nodemon
```

### Script en package.json

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

### Usar nodemon

```bash
npm run dev
```

---

## 🧩 Organizando las Rutas con `express.Router()`

**routes/saludo.routes.js**

```javascript
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('GET: ¡Hola desde /saludo! 👋');
});

router.post('/', (req, res) => {
  res.send('POST: ¡Saludo recibido! 💌');
});

module.exports = router;
```

**index.js**

```javascript
const saludoRouter = require('./routes/saludo.routes');
app.use('/saludo', saludoRouter);
```

---

## ✅ ¿Qué aprendiste?

✔️ Crear un servidor básico con Express  
✔️ Definir rutas y manejar diferentes verbos HTTP  
✔️ Servir archivos estáticos (HTML, CSS, JS)  
✔️ Enviar y recibir JSON con `req.body`  
✔️ Usar `nodemon` para desarrollo ágil  
✔️ Modularizar rutas con `express.Router()`

---

## 🧭 Próximos pasos

- Manejar parámetros dinámicos en rutas
- Validar datos recibidos en el body
- Integrar Handlebars
- Separar controladores

¡Felicitaciones por completar tu primer servidor Express! 🎉
