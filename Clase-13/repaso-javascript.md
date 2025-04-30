# ✨ Repaso de JavaScript Moderno para Principiantes

> 🎯 Objetivo: Dominar los fundamentos de JavaScript moderno (ES6+) con ejemplos prácticos y ejercicios interactivos.

---

## 📜 Índice Rápido

1. [🔤 var, let, const y Scope](#1--var-let-const-y-el-scope)
2. [🧵 Template Literals](#2--template-literals)
3. [📦 Destructuración](#3--destructuración-de-objetos-y-arrays)
4. [✨ Operador Spread y Rest](#4--operador-spread-y-rest-)
5. [🔁 Funciones Flecha](#5--funciones-tradicionales-vs-flecha)
6. [🧠 Closures](#6--closures-clausuras)
7. [🔄 Callbacks y Callback Hell](#7--callbacks-y-callback-hell)
8. [⏳ Promesas](#8--promesas)
9. [🔗 Promesas en Cadena](#9--promesas-en-cadena)
10. [🚀 Async/Await](#10--async--await)

---

## 1. 🔤 `var`, `let`, `const` y el Scope

### 🧠 Explicación:

- `var`: tiene **scope de función**, puede redeclararse y reasignarse.
- `let`: tiene **scope de bloque**, puede reasignarse pero no redeclararse.
- `const`: también tiene **scope de bloque**, no puede redeclararse ni reasignarse.

El `scope` (alcance) define dónde una variable o función puede ser accedida dentro del código. Es como un "ámbito de visibilidad" que determina desde qué partes del programa puedes usar una variable.

### Scope Global:

- Las variables declaradas fuera de cualquier función o bloque tienen alcance global.
- Pueden ser accedidas desde cualquier parte del código (incluyendo funciones).

### 💡 Ejemplo:

```js
let mensaje = 'Hola'; // Variable global

function saludar() {
  console.log(mensaje); // Accede a la variable global
}

saludar(); // Imprime "Hola"
```

### Scope de Función (var):

- Las variables declaradas con var dentro de una función solo son accesibles dentro de esa función.

### 💡 Ejemplo:

```js
function ejemplo() {
  var local = 'Solo visible aquí';
  console.log(local); // Funciona
}

ejemplo();
console.log(local); // ¡Error! `local` no existe fuera de la función.
```

### Scope de Bloque (let y const):

- Las variables declaradas con let y const tienen alcance de bloque ({}).
- Solo son accesibles dentro del bloque donde fueron declaradas (ej: if, for, while).

### 💡 Ejemplo:

```js
if (true) {
  let bloque = 'Solo visible en este bloque';
  const PI = 3.14; // También de bloque
  console.log(bloque); // Funciona
}

console.log(bloque); // ¡Error! `bloque` no existe aquí.
console.log(PI); // ¡Error! `PI` no existe aquí.
```

<details>
<summary>🧩 Ejercicio</summary>

```js
function pruebaScope() {
  if (true) {
    var x = 'var';
    let y = 'let';
    const z = 'const';
  }
  // ¿Qué variables están accesibles aquí?
}
```

</details>

---

## 2. 🧵 Template Literals

### 🧠 Explicación:

Permiten interpolar variables fácilmente con backticks (\`). Ideal para evitar concatenación engorrosa.

### 💡 Ejemplo:

```js
const nombre = 'Lucía';
console.log(`Hola, ${nombre}!`); // Hola, Lucía!
```

### 💡 Ejemplo Avanzado:

```js
const producto = { nombre: 'Laptop', precio: 999 };
console.log(`
  Producto: ${producto.nombre}
  Precio: $${producto.precio.toFixed(2)}
  En stock: ${producto.stock ? 'Sí' : 'No'}
`);
```

<details>
<summary>🧩 Ejercicio</summary>

```js
const usuario = { nombre: 'Ana', edad: 25 };
// Mostrar: "Ana (25 años) emplea template literals.
```

</details>

---

## 3. 📦 Destructuración de Objetos y Arrays

### 🧠 Explicación:

Permite extraer valores de objetos o arrays de forma clara y directa.

### 💡 Ejemplo:

```js
const persona = { nombre: 'Carlos', edad: 30 };
const { nombre, pais = 'México' } = persona;

const colores = ['rojo', 'verde'];
const [primero, segundo, tercero = 'azul'] = colores;
```

<details>
<summary>🧩 Ejercicio</summary>

```js
const config = { host: 'localhost', port: 8080 };
// Extraé las variables host y port con destructuring.
```

</details>

---

## 4. ✨ Operador Spread y Rest (`...`)

### 🧠 Explicación:

- **Spread** `...`: copia o expande elementos de un array u objeto.
- **Rest** `...`: captura múltiples elementos en una variable como array.
  > _El mismo símbolo `...` se comporta diferente según el contexto: spread "descompone" y rest "agrupa"._

### 💡 Ejemplo:

```js
const arr1 = [1, 2];
const arr2 = [...arr1, 3]; // spread

function sumar(...numeros) {
  // rest
  return numeros.reduce((a, b) => a + b);
}
```

<details>
<summary>🧩 Ejercicio</summary>

```js
const original = ['a', 'b'];
// Copiá original en otro array y agregá "c" al final usando spread.
```

</details>

---

## 5. 🔁 Funciones tradicionales vs flecha

### 🧠 Explicación:

Las funciones flecha tienen una sintaxis más corta, pero **no tienen su propio `this`**, lo cual puede afectar cómo acceden a propiedades de un objeto dentro de métodos o callbacks.

> 🔍 _En funciones tradicionales, `this` hace referencia al contexto donde se llama la función. En funciones flecha, `this` se hereda del contexto donde fue definida._

### 💡 Ejemplo:

```js
function suma(a, b) {
  return a + b;
}
const resta = (a, b) => a - b;
```

<details>
<summary>🧩 Ejercicio</summary>

```js
// Convertí esta función a función flecha:
function saludar(nombre) {
  return 'Hola ' + nombre;
}
```

</details>

---

## 6. 🧠 Closures (Clausuras)

### 🧠 Explicación:

Una _closure_ (clausura) es una función que **recuerda el entorno en el que fue creada**, incluso si se ejecuta fuera de ese entorno. Permiten mantener estado sin variables globales.

### 💡 Ejemplo:

```js
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
```

<details>
<summary>🧩 Ejercicio</summary>

```js
// Creá una función que retorne otra función que sume un número base:
const sumar5 = crearSumador(5);
sumar5(10); // 15
```

</details>

---

## 7. 🔄 Callbacks y Callback Hell

### 🧠 Explicación:

Un _callback_ es una función que se pasa como argumento a otra función y se ejecuta después.

**Callback Hell** ocurre cuando se encadenan múltiples callbacks, generando un código muy difícil de leer y mantener.

### 💡 Ejemplo:

```js
function hacerTarea(callback) {
  setTimeout(() => {
    console.log('Tarea hecha');
    callback();
  }, 1000);
}
```

<details>
<summary>🧩 Ejercicio</summary>

```js
// Anidá 3 funciones con setTimeout para simular "callback hell".
// Cada una debe imprimir un paso: Paso 1 -> Paso 2 -> Paso 3
```

</details>

---

## 8. ⏳ Promesas

### 🧠 Explicación:

Las promesas permiten manejar procesos asincrónicos de manera más clara, evitando la anidación excesiva de callbacks.

Manejan operaciones asíncronas con 3 estados:

- `pending` → Operación en progreso.
- `fulfilled` → Éxito (se llama a .then()).
- `rejected` → Falla (se llama a .catch()).
- `finally` → Se ejecuta siempre, haya éxito o error.

### 💡 Ejemplo:

```js
const promesa = new Promise((resolve, reject) => {
  setTimeout(() => {
    const exito = Math.random() > 0.5;
    if (exito) {
      resolve('¡Éxito!');
    } else {
      reject('¡Error!');
    }
  }, 1000);
});

promesa
  .then((mensaje) => console.log(mensaje)) // ¡Éxito!
  .catch((error) => console.error(error)) // Se ignora si no hay error
  .finally(() => console.log('Listo')); // Siempre se ejecuta
```

<details>
<summary>🧩 Ejercicio</summary>

```js
// Creá una promesa que se resuelva luego de 2 segundos con el mensaje "OK".
```

</details>

---

## 9. 🔗 Promesas en cadena

### 🧠 Explicación:

Encadenar `.then()` permite hacer múltiples acciones asincrónicas secuenciales sin profundizar en la indentación.

### 💡 Ejemplo:

```js
primero().then(segundo).then(tercero);
```

<details>
<summary>🧩 Ejercicio</summary>

```js
// Simulá 3 pasos encadenados que impriman: Paso 1, Paso 2, Paso 3.
```

</details>

---

## 10. 🚀 `async` / `await`

### 🧠 Explicación:

Permiten escribir código asincrónico con una sintaxis más parecida a la síncrona. Usan promesas "por debajo".

> 🔐 _Las funciones con `await` deben estar dentro de una función declarada como `async`._

- `async`: Declara una función asíncrona (retorna una promesa).
- `await`: Pausa la ejecución hasta que la promesa se resuelva.

### 💡 Ejemplo con Fetch:

```js
async function obtenerUsuario() {
  try {
    const response = await fetch('https://api.example.com/user');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    console.log('Carga finalizada');
  }
}
```

<details>
<summary>🧩 Ejercicio</summary>

```js
// Convertí esta promesa a una función async/await:
fetch('/api')
  .then((res) => res.json())
  .then((data) => console.log(data));
```

</details>

---

## 📚 Recursos Adicionales

- [MDN JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript)
- [JavaScript.info](https://javascript.info/)

> ✅ ¡Fin del repaso!
