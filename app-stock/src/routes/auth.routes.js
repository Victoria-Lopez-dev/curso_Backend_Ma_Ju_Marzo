const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { body } = require('express-validator');

router.post('/register', authController.register);
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('📧 Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('🔒 Mínimo 6 caracteres'),
  ],
  authController.login
);

module.exports = router;
