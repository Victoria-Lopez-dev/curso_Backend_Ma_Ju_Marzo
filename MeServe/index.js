const express = require('express'); // Importamos express
const app = express(); // Creamos la app
const PORT = 3000; // Puerto donde escuchará el servidor

app.get('/', (req, res) => {
  console.log(req);
  console.log(res);

  res.send(
    '¡Hola desde Express! Esta es la ruta raíz. Puedes acceder a /api para ver la API.'
  );
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
