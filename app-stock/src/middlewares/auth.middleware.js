const jwt = require('jsonwebtoken');
const pool = require('../config/db.mysql'); // tu pool MySQL

// ✅ Middleware: Verifica que el token JWT sea válido
const authenticateToken = (req, res, next) => {
  // headers['authorization] = `Bearer ${token}`;

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
// const authorizeRole = (...allowedRoles) => {
//   return (req, res, next) => {
//     const userRoles = req.user?.roles || [];

//     // Verifica si al menos uno de los roles del usuario está en los roles permitidos
//     const hasRole = userRoles.some((role) => allowedRoles.includes(role));

//     if (!hasRole) {
//       return res
//         .status(403)
//         .json({ message: 'No tienes permisos suficientes.' });
//     }

//     next();
//   };
// };

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
  authenticateToken,
  authorizePermission,
  // authorizeRole, // Esto quedo obsoleto para la funcionalidad de la app, no es escalable
};
