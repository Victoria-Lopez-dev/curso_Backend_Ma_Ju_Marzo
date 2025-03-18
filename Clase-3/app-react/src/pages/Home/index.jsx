import Nav from "../../components/Nav";
import Seccion1 from "../../components/Seccion1/Seccion1";
import Boton from '../../components/Boton';
import { useState } from "react";
import './home.css'

//props ??? -> pasar informacion - propiedades de los componentes
//pasamos info de un componente a otro -> de padres a hijos 

export default function Home(){
    //let titulo="Un titulo Principal";

    const[titulo,setTitulo]=useState("Un titulo Principal");
    //estado : creamos un estado llamado titulo que contiene como valor incial"Un titulo Principal" 
    let[numero,setNumero]=useState(0);
    let[claseTitulo,setClasetitulo]=useState("colorTitulo")

    const cambiar=()=>{
       //titulo="Nuevo titulo";
       setTitulo("Nuevo titulo");//cambiar el contenido
    //    setClasetitulo("otraClase")//cambiamos el valor de la clase
    }
    const sumar=()=>{
        setNumero(numero+1)
    }


    return(
        <>
            <Nav/>
            <h1 className={claseTitulo}>{titulo}</h1>
            <p>Contador: <span id="contador">{numero}</span></p>
            <button onMouseOver={sumar}>SUMAR</button>

            <Seccion1/>

            <button onClick={cambiar}>Cambiar titulo</button>
            <Boton contenido="Rojo" setClasetitulo={setClasetitulo}/>
            <Boton contenido="Verde" setClasetitulo={setClasetitulo}/>
            <Boton contenido="Azul" setClasetitulo={setClasetitulo}/>
            
        </>
    )
}

/// hooks -> funciones React que nos permiten manipular estado - ciclos de vida de un componente.

//use : useState() useEffect() useParams(),etc...

//useState() : estado , setter (funcion que modifica el estado)
// la funcion useState me trae un array donde en la posicion 0 esta el estado y en la posicion 1 el setter 
//estado -> variable

//Break de 15 minutos -> 21:15 hs volvemos 