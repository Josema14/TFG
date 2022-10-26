import React from 'react'
import "./Item.css"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from "react-router-dom";

import axios from '../../components/axios'
export default function Card(props) {

  const navigate = useNavigate();

  

  const prop = props.prop.item;

  
  function comprar(){
    //Obtenemos el usuario

    let email = localStorage.getItem("email");
  
    //Si no está logueado nos reenvía al inicio de sesión.
    if (email === "null"){
      navigate("/login");
      return
    }

    //Si está logueado enviamos el usuario a inventory y realizamos la petición al servidor
  

    //Enviamos la petición con axios

    axios.post('/purchase', {
      email: email,
      _id: prop._id,
    }).then(() => {
      navigate("/inventory");
    }).catch( (e)=>{
      alert("Ya tienes este paquete en tu inventario")
    }

    )

    
  }

  function intercambiar(){

  }

  
  

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }


function formatDate(date) {
    var start = new Date(date)
    return [
      
      padTo2Digits(start.getDate()),
      padTo2Digits(start.getMonth() + 1),
      start.getFullYear(),
    ].join('-');
  }



  

  return (
    
    <div className='card-item-container'>
        <div className='card-item-image-container'>

        <img src={prop.imagen} alt="Imagen Viaje"/>

        </div>

        <div className='card-item-text-container'>
          <div className='card-item-text-header'>
            <div>
          <span className='tag'> {prop.tipo}</span>
          <span className='tag'><a className='card-item-place' href={"https://www.google.es/maps/place/" + prop.ubicacion} target="_blank" rel="noreferrer">{prop.ubicacion}</a></span>
          </div>

        
          <div className='card-item-text-icon'>
          <PersonIcon fontSize="small"/> 
          <span>{prop.personas}</span>
          </div>


          </div>
          
            <div className='card-item-title-container'>
            <h3>{prop.titulo}</h3>

            <div className='card-item-text-icon' >
            <CalendarMonthIcon fontSize='small'/>
            <label>{formatDate(prop.fechaInicio) + " - " +  formatDate(prop.fechaFinal)}</label>
            </div>
            </div>

            <div style={{"marginLeft" : "5px"}}>

            <p className='card-item-text-desc'>{prop.descripcion}</p>
            
            
           
         

         
            
            </div>
           
        </div>

        <div className='card-footer'>
          

          
            
         
          
          <div className='card-item-price-container' >
        
          <label className='card-item-text-price one'>{prop.precio}€</label>
          </div>
          <div className='card-item-button-container'>
          <label className='three'>@{prop.propietario}</label>
          {(props.prop.location === "inventory") ? <button className='card-item-button two' onClick={intercambiar} >Intercambiar</button> : <button className='card-item-button two' onClick={comprar} >Comprar</button>
          
  }
          </div>
          
        </div>

    </div>
  )
  

}
