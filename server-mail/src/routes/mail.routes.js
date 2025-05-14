const express = require('express');
const router = express.Router();
const mailController = require('../controllers/mail.controller');

router.get('/contact', (req, res) => {
  res.render('forms/contact');
});

router.post('/send-email', mailController.sendEmail);

module.exports = router;
