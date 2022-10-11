import React from 'react'
import "./Item.css"
export default function Card(props) {
  return (
    
    <div className='card-item-container'>
        <div className='card-item-image-container'>

        <img src={props.imagen}/>

        </div>

        <div className='card-item-text-container'>
          <span className='tag'> {props.tipo}</span>
            <div className='card-item-title-container'>
            <h3>{props.titulo}</h3>
            </div>

            <div>
            <p>Fecha de inicio: <label>{props.fecha}</label></p>
            <p>Fecha de finalización: <label>{props.duracion}</label></p>
            <p>Precio: <label>{props.precio}</label></p>
            </div>
            <p>{props.descripcion}</p>
        </div>

        <div className='card-footer'>
          <hr/>
          <button>Comprar</button>
        </div>

    </div>
  )
}
