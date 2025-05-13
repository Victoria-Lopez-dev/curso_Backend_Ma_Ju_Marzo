# 🚀 Tutorial 3: Expandiendo el servidor Node.js + Express con EJS y Handlebars

En este tutorial, aprenderemos a trabajar con **layouts**, **vistas** y **fragmentos reutilizables** (\`header\`, \`footer\`) en Node.js usando **Handlebars** y **EJS**.

---

## ✨ Ambos motores te permiten generar contenido HTML dinámico desde tu servidor Node.js, elige según el nivel de control o seguridad que necesites.

### 🧵 Handlebars

🔧 **Handlebars** es un motor de plantillas lógico que permite generar HTML dinámico desde objetos JavaScript.  
📦 **Ventaja principal:** Separa totalmente la lógica del servidor de las vistas.  
🛡️ **Seguro por defecto:** No permite ejecutar JavaScript dentro de las plantillas, lo que lo hace ideal para evitar inyecciones de código.

🧩 Usa sintaxis como:  
\`{{variable}}\` para insertar datos  
\`{{#if}}\`, \`{{#each}}\` para lógica básica  
\`{{> partial}}\` para importar fragmentos

---

### 🧬 EJS (Embedded JavaScript)

💡 **EJS** permite insertar directamente código JavaScript dentro del HTML.  
📜 **Ventaja principal:** Flexibilidad total para manipular datos, bucles, condiciones, etc.  
⚠️ **Menos seguro por defecto:** Ejecuta JavaScript, lo que requiere mayor cuidado en la validación de los datos.

🧩 Usa sintaxis como:  
\`<%= variable %>\` para mostrar contenido  
\`<% if (condicion) { %>\` para lógica  
\`<% include archivo %>\` para incluir fragmentos

---

## 🧰 1. Instalación de Motores de Plantillas

Instalamos Express y los motores:

```bash
npm install express express-handlebars ejs
```

> ⚠️ Para este tutorial instalaremos los dos motores pero es ideal instalar solo el que usemos finalmente.

---

## 🎨 2. Handlebars: Layouts y Fragmentos

### ⚙️ Configuración

```javascript
const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const port = 3000;

// Configurar Handlebars
app.engine(
  'handlebars',
  exphbs.engine({
    partialsDir: './views/partials',
  })
);
app.set('view engine', 'handlebars');
app.set('views', './views');

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
```

### 🗂️ Estructura de Archivos

```
views/
├── layouts/
│ └── main.handlebars
├── partials/
│ ├── header.handlebars
│ └── footer.handlebars
├── home.handlebars
```

### 🧩 Parciales: \`header.handlebars\`

```html
<header>
  <h1>🌟 Bienvenido a mi sitio</h1>
</header>
```

### 🧩 Parciales: \`footer.handlebars\`

```html
<footer>
  <p>🍂 Todos los derechos reservados - 2025</p>
</footer>
```

### 🧱 Layout Base: \`main.handlebars\`

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>{{titulo}}</title>
    <link rel="stylesheet" href="/css/style.css" />
  </head>
  <body>
    {{> header }}

    <main>{{{body}}}</main>

    {{> footer }}
  </body>
</html>
```

### 📄 Vista: \`home.handlebars\`

```html
<h2>{{titulo}}</h2>
<p>{{mensaje}}</p>
```

### 🔗 Ruta para renderizar

```
app.get('/hbs', (req, res) => {
  res.render('home', {
    titulo: '👋 Bienvenido con Handlebars',
    mensaje: 'Esto fue renderizado con Handlebars',
  });
});
```

---

## ✨ 3. EJS: Vistas Dinámicas y Fragmentos

### ⚙️ Configuración

```
app.set('view engine', 'ejs');
app.set('views', './views');
```

### 🗂️ Estructura de Archivos

```
views/
├── partials/
│ ├── header.ejs
│ └── footer.ejs
├── home.ejs
```

### 🧩 Parciales: \`header.ejs\`

```html
<header>
  <h1>🌟 Bienvenido al sitio con EJS</h1>
</header>
```

### 🧩 Parciales: \`footer.ejs\`

```html
<footer>
  <p>🍂 Todos los derechos reservados - 2025</p>
</footer>
```

### 📄 Vista Principal: \`home.ejs\`

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title><%= titulo %></title>
  </head>
  <body>
    <% include partials/header %>

    <main>
      <h2><%= titulo %></h2>
      <p><%= mensaje %></p>
    </main>

    <% include partials/footer %>
  </body>
</html>
```

### 🔗 Ruta para renderizar

```javascript
app.get('/ejs', (req, res) => {
  res.render('home', {
    titulo: '👋 Bienvenido con EJS',
    mensaje: '¡Esto es EJS renderizado!',
  });
});
```

---

## 🤔 4. ¿Se pueden usar EJS y Handlebars juntos?

⚠️ **Técnicamente no en una misma vista o layout.**

Puedes tener **ambos instalados** y usarlos **por separado** según la ruta:

- Rutas que usan \`.handlebars\` → requieren que \`view engine\` esté en \`handlebars\`
- Rutas que usan \`.ejs\` → requieren que \`view engine\` esté en \`ejs\`

👉 Para usar ambos, deberías configurar manualmente cada motor en rutas distintas o usar múltiples instancias de renderizado, lo cual no es nativo ni recomendable en Express sin middleware adicional.

**Recomendación:** Elige uno como motor principal para mantener coherencia.

---

## 🆚 5. Diferencias Clave entre Handlebars y EJS

| Característica           | Handlebars                              | EJS                         |
| ------------------------ | --------------------------------------- | --------------------------- |
| ✍️ Sintaxis              | \`{{variable}}\`                        | \`<%= variable %>\`         |
| 🔐 Seguridad por defecto | ✅ Alta (no ejecuta JS)                 | ⚠️ Baja (puede ejecutar JS) |
| 🧠 Lógica en plantillas  | 🚫 Limitada                             | ✅ Completa (if, for, etc.) |
| 🧱 Soporte de layouts    | ✅ Integrado con \`express-handlebars\` | ⚠️ Manual                   |
| 🧩 Parciales             | ✅ Con \`{{> header}}\`                 | ✅ Con \`<% include %>\`    |

---

## ✅ 6. Conclusión

Con este tutorial, aprendiste a:

- 📦 Instalar y configurar **Handlebars** y **EJS**
- 🎨 Crear **layouts y vistas reutilizables**
- 🧩 Separar y reutilizar fragmentos (\`header\`, \`footer\`)
- 🔍 Comparar ventajas y usos de cada motor
- 🛑 Entender las limitaciones de usarlos

> ✨ Ambos motores son válidos según tu flujo de trabajo. ¡Ahora tienes herramientas para decidir cuál usar y cómo sacarle el mayor provecho!
