/*
 comportamiento del sitio - datos - informacion 
*/

//tipos de datos
//string (caracteres , entre comillas : "" ,'' ,``
//boolean verdadero/falso -> true - false 
// numbers -> numeros, no requiere de ningun simbolo para identificarlos (numeros decimales se escriben con punto en vez de coma )



//palabras reservadas 
//NaN
//undefined
//null
//infinite


//variables -> espacios de memoria donde almacenar datos (viven mientras se reproduce el documento )



//creamos la variable
//sintaxis: ref nombre = valor; 

// ref -> var - let -const

let fruta="naranja";
let articulo;
const calculo=44;


//utilizamos -> sintaxis nombrar la varible

console.log(articulo,calculo)
// alert("HOLAA") -> ejecutando el documento en node tira error 
//modificar contenido
fruta="manzana";


//podemos ver la consola por medio del browser ( herramientas del desarrollador) o usando la consola de la terminal por medio de node.

//node -> entorno de ejecucion de JS multiplataforma que permite ejecutar JS sin la necesidad de un browser -(todo metodo que aplique en un browser : alert -prompt -DOM - va a dar error.)


///operaciones 
//aritmeticas(calculos + - * /) (devuelven un resultado )
// ojo con el tipo de dato 
//suma (+): suma matematica , concatenacion 

44+20 //62
"44"+20  //4420
"Hola"+ fruta //Holamanzana
typeof(fruta)//metodo de JS que nos devuelve el tipo de dato ingresado

//metodos modificar el tipo de dato:

//parseInt()-parseFloat() - Number() -> transformar a numero lo que coloquemos dentro de los parentesis
//toString() -> transformar a string

"hola"-fruta //NaN Not a Number
//de comparacion (nos devuelve un booleano)
//simbolos : == === != !== >< >= <=


fruta === "banana" //false
fruta="banana"//modificando el contenido de la variable 

// - logicas : anidar operaciones booleanas(nos devuelve un booleano)
//simbolos :
//  && (and)"y"-> se cumplan todas las condiciones para devolvernos un boolean true 

// usuario =='registrado'&& password ==='registrada'
// - || (or) "o"-> por lo menos una de esas comparaciones de true para dar como resultado final true
let vieneConAdulto=true
// edad>16 || vieneConAdulto 

//  - ! (not) "no" -> nos da el booleano opuesto 
vieneConAdulto=!vieneConAdulto


//Funciones -> conjunto de instrucciones 
//crear la funciones
//tradicional

/* sintaxis

function nombreFuncion (parametros){
conjunto de codigo/intruccion de la funcion 

}
*/

function sumar2num(num1,num2) {
    let suma=num1+num2
    console.log(suma)
    return suma
    //....
}
function promedio(suma) {
    console.log(suma/2)
    // return ->si no retorno nada, nos devuelve un undefined
}


//arrow function - funcion flecha 

/* let/const nombreFuncion= (param)=>{
    conjunto de condigo a ejecutar...
    }

*/

const funcionAlerta=(info)=>{
    alert(info)
}
//hoisting
//utilizarlo - ejecutarla 
//nombreFuncion()
let resultado =sumar2num(33,1)
sumar2num(22,fruta)
sumar2num(-22,4,)
funcionAlerta("HOLA")
console.log(promedio(resultado))


// a la vuelta del break :

//array-objetos- condicionales - bucles - DOM

//volver 21:05hs