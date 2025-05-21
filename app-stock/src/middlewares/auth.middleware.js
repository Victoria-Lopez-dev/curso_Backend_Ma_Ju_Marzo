const jwt = require('jsonwebtoken');

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
