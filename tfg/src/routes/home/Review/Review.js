import React from 'react'
import Card from './Card'
export default function Review() {
  return (
    <div>
        <h1>Opiniones de nuestros usuarios</h1>

        <div className='Review-container' style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
           <Card nombre= "Antonio Gómez" titulo="Ingeniero Informático en Madrid" imagen="./imagenes/Emma.png" texto="Lorem ipsum dolor sit amet, consectetur adipiscing elit.consectetur adipiscing elit.consectetur adipiscing elit."/>
           <Card titulo="Sara, Policía en Murcia" imagen="../../../images/imagen.jpeg" texto="Prueba"/>
           <Card titulo="Juan José, Ingeniero Eléctrico en Madrid" imagen="../../../images/imagen.jpeg" texto="Prueba"/>


        </div>


    </div>
  )
}
