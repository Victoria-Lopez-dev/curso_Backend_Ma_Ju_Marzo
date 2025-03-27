//POO 
//Herencias...

//clases -> MOLDE donde defino los atributos y los metodos que corresponde a cada clase 

//superclase
class Persona {
    //caracteristicas -> atributos
  
    constructor(nombrePersona,apellidoPersona,edadPersona,emailPersona){
        this.nombre=nombrePersona
        this.apellido=apellidoPersona
        this.edad=edadPersona
        this.email=emailPersona
    }

    //comportamientos -> metodos
    sumar(num1,num2){
        console.log(num1+num2)
    }
    sacarTurno(){
        console.log("sacando turno..")
    }
}

//subclase -> toma todo lo que tiene la clase y me permite poder agregarle lo que necesite 
class Recepcion extends Persona{
   
    constructor(nombrePersona,apellidoPersona,edadPersona,emailPersona,usuarioRep){
        super(nombrePersona,apellidoPersona,edadPersona,emailPersona);//para los atributos que se trae de Persona
        this.usuario=usuarioRep
    }
    actualizarHistorial(){
        console.log("historial actualizado...")
    }
    cobrar(){
        return "cobrado.."
    }
}



//instancia de una clase (objeto)

let pepe=new Persona();//creo una instancia de Persona pepe
//completo los atributos de pepe
pepe.nombre="Jose"
pepe.apellido="Gomez"
pepe.edad=33

//otra manera de crear una instancia de una clase Persona , agregando sus atributos directamente
let julia= new Persona("Julia","Ruiz",55,"email..");
let martin= new Recepcion("Martin","Perez",44,"email..","martinRep");
let laura =new Recepcion("Laura","Lopez",55,"email..","lauraRep");

console.log(martin);
// martin.sumar(11,11)
martin.actualizarHistorial()
 pepe.sacarTurno()

//veterinaria -> recepcion - dueños - veterinaria 




