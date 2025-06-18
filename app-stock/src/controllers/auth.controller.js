const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Asegurate de que esté importado
const pool = require('../config/db.mysql');
const { validationResult } = require('express-validator');

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

    console.log(existing);
    if (existing.length > 0) {
      return res
        .status(409)
        .json({ message: 'Usuario o email ya registrado.' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('Contraseña encriptada:', hashedPassword);

    // Insertar el nuevo usuario
    const [userResult] = await pool.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );

    res
      .status(201)
      .json({ message: 'Usuario registrado', userId: userResult.insertId });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error al registrar usuario', details: err });
  }
};

exports.login = async (req, res) => {
  // Esto lo tendria que pasar a un Middleware como dice el archivo express-validator.md
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  const { email, password } = req.body;
  console.log('Login request:', req.body); // Log para depuración

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

    const userData = {
      id,
      username,
      roles, // <- roles del usuario
    };

    // 5️⃣ Generar el token JWT
    const token = jwt.sign(
      userData, // <- payload que codificás dentro del token
      process.env.JWT_SECRET, // <- clave secreta para firmar
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' } // <- duración del token
    );

    // 🔄 Reemplazamos la parte final de tu login
    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // ✅ Asegurate de tener HTTPS en producción
      sameSite: 'none', // ✅ Porque frontend y backend están en dominios distintos
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
    });

    res.status(200).json({ message: 'Login exitoso', userData });

    /** // Antes de usar Cookies
    // 6️⃣ Devolver el token al frontend 
    res.status(200).json({ message: 'Login exitoso', token });
		 */
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ message: 'Error del servidor.' });
  }
};

exports.logout = (req, res) => {
  // Borrar la cookie del token
  res.clearCookie('token', {
    httpOnly: true,
    secure: false, // ✅ Asegurate de tener HTTPS en producción
    sameSite: 'none', // ✅ Porque frontend y backend están en dominios distintos
  });

  res.status(200).json({ message: 'Logout exitoso' });
};
