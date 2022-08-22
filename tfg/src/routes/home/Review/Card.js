import React from 'react'
import "./Card.css"
export default function Card(props) {
  return (
    
    <div className='card-container'>
        <div className='card-image-container'>

        <img src={`/${props.imagen}.jpg`}/>

        </div>

        <div className='card-text-container'>
          <span className='card-text-container-name'> {props.nombre}</span>
            <h2>{props.titulo}</h2>
            <p>{props.texto}</p>


        </div>

        <div className='card-footer'>
        </div>

    </div>
  )
}
