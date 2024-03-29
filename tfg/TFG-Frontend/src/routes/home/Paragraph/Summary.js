import React from 'react'
import Paragraph from './Paragraph'
import "./Summary.css"
export default function Summary() {
    return (
      <div className="summary">
      <div className='summary-container'>
        <Paragraph title="¿Qué hacemos?" text="Nuestra aplicación consiste en la compra e intercambio de paquetes de viajes y experiencias. Estos paquetes se pueden comprar y publicar a través de la página de productos."/>
        <Paragraph title="Nuestros paquetes" text="Estos paquetes pueden consistir en pequeñas experiencias de breve duración como una visita a un spa 
          o un hotel hasta experiencias más extensas como un viaje por el Mediterráneo o por Asia."/>
        <Paragraph title="Intercambios" text="TripTrades también ofrece la posibilidad de realizar un intercambio de un paquete con otro usuario
          , para ello, la diferencia de TripPoints no debe ser mayor a 200."/>


      </div>
      
   
  
      </div>
    )
  }
  