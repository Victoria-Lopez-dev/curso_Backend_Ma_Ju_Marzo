# 📬 Enviando correos desde Express con Nodemailer, Ethereal y Handlebars

## 📌 ¿Qué es Nodemailer y Ethereal?

**[Nodemailer](https://nodemailer.com/)** es un módulo de Node.js que permite enviar correos electrónicos fácilmente.  
**[Ethereal](https://ethereal.email)** es un servicio gratuito que genera cuentas SMTP falsas para pruebas, sin enviar correos reales. Ideal para desarrollo.

Este tutorial te mostrará cómo integrar Nodemailer con Handlebars para enviar correos personalizados desde un formulario en Express.

---

## 📁 Estructura del proyecto

```
/project-root
│
├── app.js
├── routes/
│ └── mail.routes.js
├── controllers/
│ └── mail.controller.js
├── views/
│ ├── emails/
│ │ └── welcome.handlebars
│ └── forms/
│   └── contact.handlebars
```

---

## 📦 Instalación de dependencias

```bash
npm i express nodemailer express-handlebars
```

> `npm i -D nodemon `

---

## 🧠 Configuración base (`app.js`)

```js
const express = require('express');
const path = require('path');
const mailRoutes = require('./routes/mail.routes');

const app = express();
const PORT = 3000;

app.engine(
  'handlebars',
  exphbs.engine({
    partialsDir: './views',
    defaultLayout: false,
  })
);

// Configuración de Handlebars
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.json());

// Rutas
app.use('/', mailRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
```

---

## 🛣️ Rutas (`routes/mail.routes.js`)

```js
const express = require('express');
const router = express.Router();
const mailController = require('../controllers/mail.controller');

router.get('/contact', (req, res) => {
  res.render('forms/contact');
});

router.post('/send-email', mailController.sendEmail);

module.exports = router;
```

---

## 📝 Formulario HTML (`views/forms/contact.handlebars`)

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MyBackend - Contact</title>

    <style>
      form {
        max-width: 400px;
        margin: auto;
        padding: 1em;
        border-radius: 10px;
        background: #f4f4f4;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }

      label {
        margin-top: 1em;
        display: block;
      }

      input,
      textarea {
        width: 100%;
        padding: 0.5em;
        margin-top: 0.3em;
        border-radius: 5px;
        border: 1px solid #ccc;
      }

      button {
        margin-top: 1em;
        padding: 0.7em 1.5em;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
      }
    </style>
  </head>

  <body>
    <form id="contactForm">
      <label for="name">👤 Nombre:</label>
      <input type="text" id="name" name="name" required />
      <label for="email">📧 Email:</label>
      <input type="email" id="email" name="email" required />
      <label for="message">✉️ Mensaje:</label>
      <textarea id="message" name="message" required></textarea>
      <button type="submit">🚀 Enviar</button>
      <p id="responseMsg" style="margin-top:10px;"></p>
    </form>

    <script>
      const contactForm = document.getElementById('contactForm');

      if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
          e.preventDefault();
          const formData = new FormData(this);
          const data = Object.fromEntries(formData.entries());
          const response = await fetch('/send-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
          const resultText = document.getElementById('responseMsg');
          if (response.ok) {
            resultText.textContent = '✅ ¡Mensaje enviado con éxito!';
            resultText.style.color = 'green';
            this.reset();
          } else {
            resultText.textContent = '❌ Error al enviar el mensaje.';
            resultText.style.color = 'red';
          }
        });
      }
    </script>
  </body>
</html>
```

---

## ✉️ Plantilla del email (`views/emails/welcome.handlebars`)

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Nuevo mensaje</title>
    <style>
      body {
        font-family: Arial, sans-serif;
      }
      .email-container {
        padding: 20px;
        border: 1px solid #eee;
        background-color: #f9f9f9;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <h2>Hola {{name}},</h2>
      <p>Gracias por tu mensaje:</p>
      <blockquote>{{message}}</blockquote>
      <p>Te responderemos pronto a {{email}}.</p>
    </div>
  </body>
</html>
```

---

## 🧠 Lógica de envío (`controllers/mail.controller.js`)

```js
const nodemailer = require('nodemailer');
const path = require('path');
const handlebars = require('handlebars');
const fs = require('fs');

// Setear credenciales
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: '',
    pass: '',
  },
});

exports.sendEmail = async (req, res) => {
  const { name, email, message } = req.body;

  const templatePath = path.join(
    __dirname,
    '../views/emails/welcome.handlebars'
  );

  const source = fs.readFileSync(templatePath, 'utf8');
  const compiledTemplate = handlebars.compile(source);

  const htmlContent = compiledTemplate({ name, email, message });

  const mailOptions = {
    from: 'tucorreo@gmail.com',
    to: email,
    subject: 'Gracias por tu mensaje',
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send('Correo enviado exitosamente 🚀');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).send('Ocurrió un error al enviar el correo ❌');
  }
};
```

> Aqui podemos usar las Credenciales que nos da [Ethereal](https://ethereal.email/create)

---

## ✅ Resultado esperado

1. Visitás [http://localhost:3000/contact](http://localhost:3000/contact)
2. Completás y enviás el formulario.
3. Se genera un correo personalizado.
4. **ver el correo** en Ethereal.
