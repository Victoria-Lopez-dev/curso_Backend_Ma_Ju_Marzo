const express = require('express'); // Importamos express
const app = express(); // Creamos la app
const PORT = 3000; // Puerto donde escuchará el servidor

app.use(express.json()); // Middleware para parsear el cuerpo de las peticiones a JSON

app.get('/', (req, res) => {
  res.send(
    '¡Hola desde Express! Esta es la ruta raíz. Puedes acceder a /api para ver la API.'
  );
});

app.get('/api/item', (req, res) => {
  res.send('GET: Obteniendo item');
});

app.post('/api/item', (req, res) => {
  res.send('POST: Creando nuevo item');
});

app.put('/api/item', (req, res) => {
  res.send('PUT: Actualizando item');
});

app.delete('/api/item', (req, res) => {
  res.send('DELETE: Eliminando item');
});

app.get('/api/productos', (req, res) => {
  // javascript que consulta la base de datos y devuelve los productos
  res.send('Productos disponibles: 🛒');
});

app.get('/api/productos/:id', (req, res) => {
  const { id } = req.params; // los parametros se obtienen de req.params que viene en la url
  res.send(`Producto solicitado: ${id} 🧾`);
});

app.post('/api/productos', (req, res) => {
  // Cargar un producto

  /**
   * Comentario:
   * Al final de la clase no estaba funcionando el body desde la peticion del cliente ThunderClient
   * Lo que estaba faltando era el middleware express.json()
   * que permite parsear el cuerpo de la peticion a JSON.
   * esto esta en la linea 5 de este archivo >> app.use(express.json());
   * Dato importante: en el cliente ThunderClient, en la pestaña Body, se debe seleccionar la opción JSON
	 * y en el campo de texto se debe escribir el JSON que se va a enviar.
	 * Por ejemplo:
	 * 
	 {
			"marca": "marolio",
			"cantidad": 10,
			"nombre": "aceite girasol",
			"precio": 1000
		}	
	 **/

  const datos = req.body;
  console.log('Datos recibidos:', datos);

  res.json({
    mensaje: 'Producto recibido correctamente ✅',
    producto: datos,
  });
});

app.get('/api/busqueda', (req, res) => {
  const { q } = req.query;
  res.send(`Buscando: ${q} 🔎`);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
