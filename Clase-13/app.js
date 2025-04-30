const nombre = 'Lucía';
console.log(`Hola, ${nombre}!`); // Hola, Lucía!

console.log('Hola, ' + nombre + '!'); // HolaLucía!

console.log('hola, ${nombre}');

const producto = { nombre: 'Laptop', precio: 999 };

console.log('Producto: ' + producto['nombre']);
console.log(`
  Producto: ${producto.nombre}
  Precio: $${producto.precio.toFixed(2)}
  En stock: ${producto.stock ? 'Sí' : 'No'}
`);

function crearContador() {
  let cuenta = 0;
  return function () {
    cuenta++;
    return cuenta;
  };
}

const contador = crearContador();
console.log(contador()); // 1
console.log(contador()); // 2
console.log(contador()); // 2
console.log(contador()); // 2
console.log(contador()); // 2
console.log(contador()); // 2
console.log(contador()); // 2
