///DOM -> Document Object Model interfaz entre HTML y JS

console.dir(document)
//nodos (elementos HTML )

//1er acceder al nodo
//metodos :
//  querySelector(trae el primer nodo que encuentra en el HTML con ese selector) - objeto
// - querySelectorAll(trae una lista de todos los nodos que encuentre en el HTML con dicho selector)

//document.querySelector("selector");

let boton1=document.querySelector(".boton");//objeto
console.dir(document.querySelectorAll(".boton"))//lista de objetos
let parrafo2=document.querySelectorAll("p")[2]

//2do acceder a las propiedades que necesitemos 
console.dir(boton1)
boton1.textContent="Click por aqui!!!"
console.log(boton1.classList)
console.dir(document.querySelector("form"))

//classList -> add() -remove() - toggle()
//setAtributte("atributo","valor")
//appendChild()

// crear una tarjeta de la taza


let taza={
    producto:"taza",
    color:["rojo","blanco","amarillo"],
    material:"porcelana",
    stock:300,
    precio:10000
};
let plato={
    producto:"plato",
    color:["rojo","blanco"],
    material:"vidrio",
    stock:30,
    precio:30000
};

let productos=[taza,plato];
/*
for(let indice=0; indice<productos.length; indice++){
    //crear un nodo ,tarjeta
    let tarjeta=document.createElement("div");

    //crear el contenido
    tarjeta.classList.add("tarjeta");
    tarjeta.innerHTML=`
                <h2>${productos[indice].producto}</h2>
                <ul>
                    <li>material :${productos[indice].material}</li>
                    <li>precio:$ ${productos[indice].precio}</li>
                    <li>cantidad disponible: ${productos[indice].stock}</li>
                </ul>
    `;
    //sumarlo al HTML
    let body=document.querySelector("body");

    body.appendChild(tarjeta)

}
*/


//eventos -> atento/ escuchando acciones que realize el usuario en el HTML y en consecuencia ejecutar funciones 

//partes de un evento:
//nodo en el que ocurre el evento 
//evento en si ->(click, load,input,change,blur,focus,...) https://developer.mozilla.org/es/docs/Web/Events

//accion en respuesta a ese evento 


//2 maneras 
//1-  todo desde JS -> metodo addEventListener()

//sintaxis:  nodo.addEventListener("evento",()=>{ accion como respuesta a ese evento})

boton1.addEventListener("click",(event)=>{
    console.log(event)
    document.querySelector("h1").classList.toggle('fondo');
});

let boton2=document.querySelectorAll(".boton")[1];
boton2.addEventListener("mouseover",()=>{
    //una vez que pase el mouse por el boton crea las tarjetas
    for(let indice=0; indice<productos.length; indice++){
        //crear un nodo ,tarjeta
        let tarjeta=document.createElement("div");
    
        //crear el contenido
        tarjeta.classList.add("tarjeta");
        tarjeta.innerHTML=`
                    <h2>${productos[indice].producto}</h2>
                    <ul>
                        <li>material :${productos[indice].material}</li>
                        <li>precio:$ ${productos[indice].precio}</li>
                        <li>cantidad disponible: ${productos[indice].stock}</li>
                    </ul>
        `;
        //sumarlo al HTML
        let body=document.querySelector("body");
    
        body.appendChild(tarjeta)
    
    }
})



//2 - haciendo una parte en HTML y otra en JS -> atributos en HTML y la funcion como respuesta al evento la realizo desde JS

//en el HTML creo un atributo con el evento que como valor tenga la funcion a ejecutar 
//atributo -> on+evento

const mostrarValorInput=(nodo)=>{
    let valorInput=nodo.value; //nodo 
     if(valorInput.length<4){
        nodo.classList.add("rojo")
     }else{
        nodo.classList.remove("rojo")
     }
    
};

//objetos propios de eventos : this(referencia al nodo/elemento en que se aplique) - event( objeto que viene como respuesta del evento ejecutado )

//BREAK!!! volvemos 21:25hs
