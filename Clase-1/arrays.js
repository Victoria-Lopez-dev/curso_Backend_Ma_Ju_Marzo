let lista=["libros","cuadernos","lapices",'fibrones',"goma","lapicera","tijera"];
console.log(lista);

//por consola indicar que tiene ese producto

// console.log("en la libreria tenemos : "+ lista[0])
// console.log("en la libreria tenemos : "+ lista[1])
//...

//bucles -ciclos- loops : estructuras que nos permiten repetir una misma accion una cierta cantidad de veces 

//for tradicional
/*
    sintaxis:

    for(accion-inicial;condicion;accion-por-vuelta){
        accion/es a repetir
    }
*/
//indice++  es lo mismo que decir indice=indice+1
for(let indice=0;indice<5;indice++){
    //console.log("en la libreria tenemos : "+ lista[3])
    console.log("en la libreria tenemos : "+ lista[indice])
}

let acumulador=0;
for (let contador = 0; contador < 6; contador++) {
    acumulador+=10
    console.log(acumulador)
}
console.log("total :" + acumulador)

//------------


//for of ->solo se puede aplicar en listas 
//recorre la lista completa
/* sintaxis:
    for(let ref of array){
        accion/es a repetir
    }
*/
let precios=[1000,300,4050,66,55]
let total=0;
for(let item of precios){
    total=total+item
}
console.log("la suma total es: "+ total)


//------------

//while
/*
    sintaxis:
    while(condicion){
        accion/es a repetir
    }
*/
let veces=0;
while(veces<5){
    console.log("hola");
    veces++
}

//------------

//do while -> por lo menos una vez ejecutarse 
/*
    do{
        accion/es a repetir
    }while(condicion)
*/
// let contador1=0
// do{
//     let password=prompt("ingrese contraseña");
//     //comprobar la contraseña ...
//     contador1++
// }while(contador1<3)
total=0;
//------------
//solo se puede aplicar en listas 
// sintaxis : array.metodo(()=>{})

//forEach -> array.forEach((refItem)=>{ accion a repetir por cada item de la lista}) // parecido al for of

precios.forEach((item)=>{
    total=total+item
})

console.log("la suma total es: "+ total)

//map -> crea un array nuevo (copia) del array original con las acciones aplicadas 

let nuevaLista=lista.map((productoLista)=>{ return "producto :"+ productoLista});

console.log(nuevaLista)

//filter -> filtrar por medio de una 'condicion' a cumplir todos los items que la cumplan

let resultado=lista.filter((prod)=>{return prod.length>6});
console.log(resultado);
//find -> ubicar al primer item que cumpla con la condicion
let resultado2=lista.find((prod)=>{return prod.length>6});
console.log(resultado2)

//para la proxima clase: objetos -metodos - DOM (eventos) -React

