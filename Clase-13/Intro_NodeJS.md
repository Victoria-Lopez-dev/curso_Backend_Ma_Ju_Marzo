
# 🌟 Introducción a Node.js

## 🧠 ¿Qué es Node.js?

Node.js es un **entorno de ejecución** para JavaScript que permite ejecutar código **fuera del navegador**.  
Está basado en **V8**, el motor de JavaScript de Google Chrome, y utiliza un modelo **asíncrono** y **orientado a eventos** para lograr un alto rendimiento.

## 🎯 ¿Para qué sirve Node.js?

Node.js es ideal para:

- Crear **servidores web rápidos y escalables**.
- Construir **APIs REST** y **servicios backend**.
- Desarrollar **aplicaciones en tiempo real**, como chats y juegos online.
- Automatizar tareas y construir **herramientas de línea de comandos (CLI)**.
- Participar en proyectos **full stack**, integrándose con frameworks como **React**, **Angular** o **Vue**.

## 🛠️ ¿Cómo instalar Node.js?

### 1. Visita el sitio oficial
👉 [https://nodejs.org](https://nodejs.org)

### 2. Descarga la versión recomendada
- Se recomienda instalar la versión **LTS** (Long Term Support) para mayor estabilidad.

### 3. Instala Node.js
- **Windows**: descarga y ejecuta el instalador `.msi`.
- **MacOS**: descarga y ejecuta el instalador `.pkg`.
- **Linux**: utiliza el gestor de paquetes de tu distribución:
  ```bash
  # Ejemplo para Ubuntu
  sudo apt update
  sudo apt install nodejs npm
  ```

### 4. Verifica la instalación
En la terminal, ejecuta:

```bash
node -v
npm -v
```
Esto debería mostrarte las versiones instaladas de Node.js y npm.

## 🚀 ¡Listo para empezar!

Crea tu primer archivo `.js` y ejecútalo:

```bash
node mi_archivo.js
```

Aquí algunos ejemplos simples para comenzar:

### 1. Hola Mundo

```javascript
// archivo: hola_mundo.js
console.log("¡Hola Mundo desde Node.js!");
```
Ejecútalo:
```bash
node hola_mundo.js
```

### 2. Leer un archivo de texto

```javascript
// archivo: leer_archivo.js
const fs = require('fs');

fs.readFile('ejemplo.txt', 'utf8', (err, data) => {
  if (err) {
    console.error("Error al leer el archivo:", err);
    return;
  }
  console.log("Contenido del archivo:", data);
});
```
(Recuerda crear un archivo llamado `ejemplo.txt` en el mismo directorio.)

### 3. Crear un pequeño servidor HTTP

```javascript
// archivo: servidor_basico.js
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('¡Hola desde tu primer servidor Node.js!');
});

server.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});
```

## ⚡ Comparativa: `http` vs `express` en Node.js

### 📜 Servidor básico usando `http` (módulo nativo)

```javascript
// archivo: servidor_http.js
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('¡Hola desde servidor HTTP!');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Página no encontrada');
  }
});

server.listen(3000, () => {
  console.log('Servidor HTTP escuchando en http://localhost:3000');
});
```

### 📜 Servidor básico usando `express` (módulo externo)

```javascript
// archivo: servidor_express.js
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('¡Hola desde Express!');
});

app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});
```

### 🔍 ¿Qué diferencias hay?

| Aspecto         | `http` (nativo) | `express` (externo) |
|-----------------|-----------------|---------------------|
| Código más corto | ❌ No            | ✅ Sí               |
| Fácil manejo de rutas | ❌ No | ✅ Sí |
| Middleware (procesamiento de peticiones) | ❌ Manual | ✅ Incorporado |
| Popularidad en proyectos reales | ⚡ Usado en casos simples | 🚀 Muy usado en producción |

### 🧠 Conclusión

- Usar `http` te da **control absoluto** pero puede ser **más tedioso** para proyectos grandes.
- Usar `express` **simplifica enormemente** la creación de servidores y APIs, por eso es uno de los frameworks más populares de Node.js.
