"use strict";
//sitio : https://www.typescriptlang.org/
//Cuando creamos una variable definamos que tipo de valores se permite
let valor = 22;
valor = 44;
console.log(valor);
let nombre = "PEpe";
const verdader = true;
//let lista = ["Ana", nombre, '222'];
let lista = ["Ana", nombre, '222']; //lista que solo permite ingresar strings
let listaB = ["Ana", nombre, '222']; //otra opcion de escribirlo 
let lista2 = [2222, false, 222444]; // lista que permite solamente ingresar numbers y booleans
lista2.push(33);
let dato = "HOLA";
dato = 222;
dato = false;
//Luego el objeto -> una instancia del objeto -> a partir de ese molde
let perrito = {
    nombre: "Firu",
    edad: 2,
    raza: "cualquiera"
};
let gato = {
    nombre: "michifus",
    raza: "otra",
    edad: 11
};
let remera = {
    categoria: "indumentaria",
    nombrePrenda: "remera",
    stock: 22,
    descuento: 10
};
let pantalon = {
    categoria: "indumentaria",
    nombrePrenda: "pantalon",
    stock: 22
    //aca le sacamos descuento y como esta definido en el type como opcional no nos tira error
};
let animales = [perrito, gato]; //estamos creando una lista que solo permita tener dentro a objetos de type Animal;
//animales.push(pantalon) me marca el error typescript ya que indique el tipo de dato posible a cargar en la lista de animales que sea Animal
for (let index = 0; index < lista.length; index++) {
    if (lista[index] == "Ana") {
        console.log(lista[index]);
    }
}
//Funciones 
function sumar(num1, num2) {
    return num1 + num2;
}
;
function saludar(nombre, apellido) {
    if (apellido == undefined) {
        console.log("hola " + nombre);
    }
    else {
        console.log(`Hola ${nombre} ${apellido}, te damos la bienvenida`);
    }
}
;
//le agrega el tipo de dato a los parametros
sumar(222, 33);
//sumar(11);nos tira error TypeScript ya que es obligatorio los 2 parametros numericos
saludar("Ana"); //aca no nos tira error Typescript ya que apellido es un parametro opcional ->?
saludar("Juan", "Perez");
//break!! volvemos 21:10 hs
