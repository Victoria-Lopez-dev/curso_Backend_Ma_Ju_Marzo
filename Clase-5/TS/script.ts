//TS con POO 


class Persona {
    //caracteristicas -> atributos
    //indicar el type de los atributos
    nombre:string
    apellido:string
    edad:number
    email:string

    //constructor -> funcion que se ejecuta cuando creo instancia y necesita que le pasemos data para completar el valor de los atributos 
    constructor(nombrePersona:string,apellidoPersona:string,edadPersona:number,emailPersona:string){//indicando el type de los parametros del constructor
        this.nombre=nombrePersona
        this.apellido=apellidoPersona
        this.edad=edadPersona
        this.email=emailPersona
    }
    //comportamientos -> metodos
    sumar(num1:number,num2:number){
        console.log(num1+num2)
    };
    sacarTurno(){
        console.log("sacando turno..")
    };
};

//creo el objeto pepe que es la instancia de la clase Persona
let pepe= new Persona("Juan","Gomez",33,"email...@ejemplo.com");

pepe.email
pepe.sumar(22,33)


