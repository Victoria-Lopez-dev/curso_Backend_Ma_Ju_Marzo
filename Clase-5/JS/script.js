"use strict";
//TS con POO 
class Persona {
    //constructor -> funcion que se ejecuta cuando creo instancia y necesita que le pasemos data para completar el valor de los atributos 
    constructor(nombrePersona, apellidoPersona, edadPersona, emailPersona) {
        this.nombre = nombrePersona;
        this.apellido = apellidoPersona;
        this.edad = edadPersona;
        this.email = emailPersona;
    }
    //comportamientos -> metodos
    sumar(num1, num2) {
        console.log(num1 + num2);
    }
    ;
    sacarTurno() {
        console.log("sacando turno..");
    }
    ;
}
;
let pepe = new Persona("Juan", "Gomez", 33, "email...@ejemplo.com");
