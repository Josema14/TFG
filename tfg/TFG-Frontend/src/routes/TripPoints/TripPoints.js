import React from 'react'
import TripCard from './TripCard'
import "./TripPoints.css"

//Dialog imports


import { addPoints } from "../../Controlador";
import { useNavigate } from 'react-router-dom';



export default function TripPoints() {

    //Variables dialog


  






  return (

    //Dialog cantidad personalizada
<>


    




    <div className='tripPoints'>
    <div className='tripPoints-container' >
        <div className='tripPoints-container-header'>
        <h1 className='tripPoints-title'>Monedero de TripPoints</h1>
        </div>
        <div className='tripPoints-container-body'>

       
        <div className='tripPoints-firstContainer'>
     <TripCard  tipo = "Add" titulo = "Añadir TripPoints" description = "Recuerde que TripTrades se lleva un porcentaje del 5% del valor introducido durante la transacción." url = "ETT.png"/>
     <TripCard  tipo = "Substract" titulo = "Extraer TripPoints" description = "Puede extraer los TripPoints que requiera sin coste adicional del valor introducido durante la transacción." url = "TTE.png"/>
    
    
    </div>
  

    
    </div>
    <div className='tripPoints-container-footer'>
    </div>
    </div>
    </div>
    </>
  )
}
