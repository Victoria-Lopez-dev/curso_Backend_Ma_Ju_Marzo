# 🛡️ Multiples roles con acceso compartido

## 🧠 Caso hipotético: múltiples roles con acceso compartido

### 🧪 Situación:

Queremos que:

- 👤 user → pueda ver productos (GET)

- 👑 admin → pueda hacer todo

- 📊 analyst (nuevo rol) → pueda acceder a métricas

Problema: `authorizeRole('admin')` ya no alcanza si queremos que más de un rol tenga acceso a cierta funcionalidad.

## 💡 Solución Mejora escalable: tabla de permisos en la base de datos

Cuando manejás múltiples roles con diferentes permisos que pueden solaparse o cambiar en el tiempo, el patrón de chequear roles hardcodeados en el middleware no escala bien. Por eso la mejor práctica es usar una **tabla de permisos o “permissions”** en la base de datos para definir qué roles pueden hacer qué acciones.

---

### 🏗️ Crear tabla de permisos

Necesitamos una tabla para registrar las acciones permitidas que luego se asignarán a roles, para esto tambien vamos a necesitar una tabla para vincular ambos.

```sql
-- Crear tabla de permisos
CREATE TABLE IF NOT EXISTS permissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    action VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);

-- Crear tabla intermedia: roles <-> permisos
CREATE TABLE IF NOT EXISTS role_permissions (
    role_id INT NOT NULL,
    permission_id INT NOT NULL,
    PRIMARY KEY (role_id, permission_id),
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE ON UPDATE CASCADE
);
```

### 🔄 Trigger: asignación automática a admin

Cada vez que se crea un permiso nuevo, lo asignamos automáticamente al rol admin.

```sql

-- Trigger para permisos nuevos asignados a admin
DELIMITER $$

CREATE TRIGGER assign_permission_to_admin
AFTER INSERT ON permissions
FOR EACH ROW
BEGIN
  DECLARE adminRoleId INT;

  -- Obtener el ID del rol admin
  SELECT id INTO adminRoleId FROM roles WHERE name = 'admin' LIMIT 1;

  -- Asignar el nuevo permiso al rol admin
  INSERT IGNORE INTO role_permissions (role_id, permission_id)
  VALUES (adminRoleId, NEW.id);
END$$

DELIMITER ;

```

#### Agregamos el nuevo role y las acciones relacionadas a los endpoints

```sql
-- Insertar nuevo role
INSERT IGNORE INTO roles (name) VALUES ('analyst');

-- Insertar acciones básicas
INSERT IGNORE INTO permissions (action, description) VALUES
('product:edit', 'Permite crear, actualizar o eliminar productos'),
('metrics:view', 'Permite ver panel de métricas');


-- Asignar permiso de métricas al rol "analyst"
INSERT IGNORE INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN permissions p ON p.action = 'metrics:view'
WHERE r.name = 'analyst';

```

---

#### 📊 **Relación entre tablas**:

🤝🏼 Visualiza cómo se conectan:
`roles`, `permissions`, `role_permissions`, y `user_roles`

```text
users ─┬─ user_roles ─┬─ roles ─┬─ role_permissions ─┬─ permissions
       │              │         │                    │
       ▼              ▼         ▼                    ▼
     user_id       role_id   role_id            permission_id
```

---

### 🔁 Cambio en el middleware `authorizeRole` a un middleware `authorizePermission`

- En vez de verificar roles, verificamos que el usuario tenga **al menos uno de los permisos necesarios**.
- Esto permite granularidad fina sin modificar el código.

```js
const pool = require('../config/db'); // tu pool MySQL

const authorizePermission = (permissionName) => {
  return async (req, res, next) => {
    const userId = req.user.id;
    try {
      const [result] = await pool.query(
        `
         SELECT p.action FROM permissions p
         JOIN role_permissions rp ON rp.permission_id = p.id
         JOIN user_roles ur ON ur.role_id = rp.role_id
         WHERE ur.user_id = ? AND p.action = ?
        `,
        [userId, permissionName]
      );

      if (result.length === 0)
        return res.status(403).json({ error: 'Permiso denegado' });

      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error verificando permisos' });
    }
  };
};

module.exports = {
  authorizePermission,
};
```

---

### 🛣️ Integración en rutas (ejemplo products.routes.js)

```js
const express = require('express');
const router = express.Router();
const { authenticateToken, authorizePermission } = require('../middlewares/auth.middleware');

// Rutas públicas
router.get('/', /* sin login */, getAllProducts);
router.get('/:id', /* sin login */, getProductById);

// Rutas protegidas
router.post('/', authenticateToken, authorizePermission('product:edit'), createProduct);
router.put('/:id', authenticateToken, authorizePermission('product:edit'), updateProduct);
router.delete('/:id', authenticateToken, authorizePermission('product:edit'), deleteProduct);
```

---

## ✅ Conclusión

🔐 Pasar de un sistema de roles rígido a un esquema de permisos dinámico es una mejora clave para escalar tu aplicación. Con este patrón:

- Separás responsabilidades de forma clara y flexible.

- Sumás nuevos roles y permisos sin tocar el código.

- Preparás tu sistema para crecer y adaptarse fácilmente.

🛠️ Esta arquitectura no solo mejora la seguridad, sino también la mantenibilidad y la colaboración entre equipos.

🚀 A partir de acá podés seguir explorando:

- Paneles de administración para asignar permisos visualmente.

- Cacheo de permisos por usuario para mejorar performance.

- Auditar acciones sensibles a partir de permisos específicos.
