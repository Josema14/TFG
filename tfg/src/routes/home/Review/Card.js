import React from 'react'
import "./Card.css"
export default function Card(props) {
  return (
    
    <div className='card-container'>
        <div className='card-image-container'>

          <img src={require("./imagenes/Emma.png")} />

        </div>

        <div className='card-text-container'>
            <h3>{props.titulo}</h3>
            <p>{props.texto}</p>



        </div>

    </div>
  )
}
