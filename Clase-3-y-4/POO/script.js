//POO  actores : caracteristicas y comportamientos
//nuevos conceptos: Clases - instancias 
let alumnos=[];//variable global 


class Administrativo{
  
    // //caracteristicas - atributos
    constructor(nombreAdmin,correoAdmin,usuarioAdmin){
        this.nombre=nombreAdmin
        this.correo=correoAdmin
        this.usuario=usuarioAdmin
    }
    //comportamientos - metodos

    ingresarAlumno(alumno){
        console.log(`${this.nombre} se encuentra ingresando alumno...`)
        alumnos.push(alumno)
        console.log(alumnos)
    }
   
};

class Alumno {

    verSusCursos(){
        console.log("visualizar cursos activos")
    }
}


//instancias de una clase - objetos - entidades

let marta= new Administrativo("Marta","marta@correo.com","martaAdmin1");//crear la instancia Marta a partir de Administrativo

marta.ingresarAlumno("pepe")//marta tiene la capacidad de ejecutar el 
console.log(marta.correo)

let julian=new Administrativo("Julian","julian@correo.com","julianAdmin1");
julian.ingresarAlumno("andres");
console.log(julian.correo)
// ingresar un alumno
//"Marta"
//"Julian"
//"Paola"


//proxima clase :
// primera parte: POO -> Herencia - Modificadores de acceso
// segunda parte: ejercitacion de TypeScript
