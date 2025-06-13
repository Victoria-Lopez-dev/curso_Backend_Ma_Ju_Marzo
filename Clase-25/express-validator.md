
# 🛡️ Validación en el Backend con `express-validator`

## ✨ ¿Qué es `express-validator`?

`express-validator` es un conjunto de middlewares para validar y sanitizar entradas en aplicaciones Express 🧼.

## 🔧 Instalación

```bash
npm install express-validator
```

---

## 🚦 Validación en Rutas

```js
const { body, validationResult } = require('express-validator');

app.post('/login',
  [
    body('email').isEmail().withMessage('📧 Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('🔒 Mínimo 6 caracteres')
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }

    res.send('✅ Login exitoso');
  }
);
```

---

## ♻️ Middleware de Validación Reutilizable

📁 **middlewares/validarCampos.js**

```js
const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  next();
};

module.exports = validarCampos;
```

✅ Usalo así:

```js
const validarCampos = require('./middlewares/validarCampos');

app.post('/login',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    validarCampos
  ],
  loginController
);
```

---

## 🧠 Validaciones Personalizadas

```js
const { body } = require('express-validator');

const existeUsuario = async (email) => {
  const existe = await User.findOne({ email });
  if (existe) {
    throw new Error('🚫 El email ya está registrado');
  }
};

router.post('/register', [
  body('email').custom(existeUsuario),
  body('password').isStrongPassword(),
  validarCampos
], registroController);
```

---

## 🗂️ Estructura Recomendada

```
📁 src/
├── 📁 middlewares/
│   └── validarCampos.js
├── 📁 routes/
│   └── auth.routes.js
├── 📁 controllers/
│   └── auth.controller.js
├── 📁 validations/
│   └── auth.validations.js
```

📁 **validations/auth.validations.js**

```js
const { body } = require('express-validator');

exports.validarLogin = [
  body('email').isEmail().withMessage('📧 Email inválido'),
  body('password').notEmpty().withMessage('🔒 Campo obligatorio')
];
```

📁 **routes/auth.routes.js**

```js
const express = require('express');
const router = express.Router();
const { validarLogin } = require('../validations/auth.validations');
const validarCampos = require('../middlewares/validarCampos');
const { login } = require('../controllers/auth.controller');

router.post('/login', validarLogin.concat(validarCampos), login);

module.exports = router;
```

---

## 🔐 Beneficios de esta arquitectura

- 🧩 Modular y escalable
- 🔄 Reutilización de lógica de validación
- 🧪 Facilita testing y mantenimiento
- 📚 Mejora la legibilidad del código

---

## ✅ Conclusión

🔁 Validar en el backend **no es opcional**: es la primera línea de defensa contra errores, ataques y datos inconsistentes.

> 🛠️ Aplicá buenas prácticas desde el inicio para un backend más sólido y seguro.
