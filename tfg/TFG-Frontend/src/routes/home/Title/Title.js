
import React from 'react'
import { Link} from "react-router-dom";
import "./Title.css"
export default function Title() {



  return (
    <div className='Title-header'>
    <div className="Title-overlay">
      <h1>"TripTrades"</h1>
<h3 className='Title-overlay-text'>Empresa pionera en el intercambio de paquetes de viaje y experiencias online</h3>
	<br></br>
  <Link to={"/shop"}>
	<button>Nuestros productos</button>
  </Link>
		</div>
   
  
  
    </div>

  )
}
