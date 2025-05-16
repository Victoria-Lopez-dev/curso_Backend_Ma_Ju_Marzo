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
    from: 'no-reply@miempresa.com',
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
