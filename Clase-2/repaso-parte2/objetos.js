
let listaProductos=["taza","platos","cubiertos"];


//Objetos -> describir entidades 
//sintaxis
/*
{
    propiedad:valor,
    propiedad:valor,
    propiedad:valor
}
    {
        key:value,
        clave:valor
    }
*/

let taza={
    color:[{tipo:"rojo",cantidad:2},"blanco","amarillo"],
    material:"porcelana",
    stock:300
}
let platos={
    material:"loza",
    precio:10000,
    stock:20
}
let persona={
    nombre:"MArta",
    apellido:"Gomez",
    direccion:{
        calle:"Pepe 11",
        localidad:"Quilmes"
    },
    saludar:()=>{
        console.log("Hola")
    }
}

let productos=[taza,platos]
// acceder al valor de la propiedad del objeto
//sintaxis -> objeto.propiedad

console.log(taza.color)
//modificar la propiedad -> objeto.propiedad= nuevoValor
persona.apellido="Perez";

//crear una propiedad -> objeto.nuevaPropiedad= valor
persona.edad=44
//eliminar propiedad -> delete objeto.propiedad

delete persona.saludar

 
//-------

console.log(Object.keys(taza))
console.log(Object.values(persona))

console.log(persona)

console.log(productos)

console.log(`tenemos en stock +: ${taza.stock} tazas`)
console.log("tenemos en stock +: "+taza.stock+" tazas")
if(taza.stock < 20){
    alert("Necesitamos mas tazas!!!")
}


console.log(productos.filter((prod)=>{return prod.material == "porcelana"}))

productos.forEach((producto)=>{
    let propiedades=Object.keys(producto);

    if(propiedades.includes("precio")== false){
        
        producto.precio=0
        
    }
   
});
console.log(productos)
//includes()-> incluye en una lista alguno de esos caracteres colocados entre parentesis



