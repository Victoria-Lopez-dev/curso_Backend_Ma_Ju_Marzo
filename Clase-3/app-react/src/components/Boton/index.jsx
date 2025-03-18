import './boton.css'

export default function boton(props) {
    console.log(props)
//todo codigo JS que querramos colocar dentro del return
    const cambiarColor=()=>{
        props.setClasetitulo(props.contenido)//cambiamos el valor de la clase
    }

    return(
        <button 
        className='botonModelo' 
        onClick={cambiarColor}>
            {props.contenido}
        </button>
    )
}