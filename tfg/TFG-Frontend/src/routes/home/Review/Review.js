import React from 'react'
import Card from './Card'
import "./Review.css"
export default function Review() {
  return (
    <div className='wrapper'>
    

      <div className='Review-container-mask'>
      <div className='Review-container-text'>
        <div className='wave'>
        <h1>Opiniones de nuestros usuarios</h1>
        </div>
        </div>
      
    </div>

        <div className='Review-container' style={{display:"flex",justifyContent:"space-evenly",alignItems:"center"}}>
           <Card nombre= "Antonio Gómez" titulo="Ingeniero Informático en Madrid" imagen="antonio" texto="Lorem ipsum dolor sit amet, consectetur adipiscing elit.consectetur adipiscing elit.consectetur adipiscing elit."/>
           <Card nombre="Sara Martínez" titulo="Policía en Murcia" imagen="sara" texto="Lorem ipsum dolor sit amet, consectetur adipiscing elit.consectetur adipiscing elit.consectetur adipiscing elit."/>
           <Card nombre= "Juan José"titulo="Ingeniero Eléctrico en Madrid" imagen="Juan" texto="Lorem ipsum dolor sit amet, consectetur adipiscing elit.consectetur adipiscing elit.consectetur adipiscing elit."/>


        </div>


    </div>
  )
}
