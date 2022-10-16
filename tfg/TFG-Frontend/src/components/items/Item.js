import React from 'react'
import "./Item.css"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
export default function Card(props) {
  return (
    
    <div className='card-item-container'>
        <div className='card-item-image-container'>

        <img src={props.imagen}/>

        </div>

        <div className='card-item-text-container'>
          <div className='card-item-text-header'>
            <div>
          <span className='tag'> {props.tipo}</span>
          <span className='tag'><a className='card-item-place' href={"https://www.google.es/maps/place/" + props.pais} target="_blank" rel="noreferrer">{props.pais}</a></span>
          </div>

        
          <div className='card-item-text-icon'>
          <PersonIcon fontSize="small"/> 
          <span>{props.person}</span>
          </div>


          </div>
          
            <div className='card-item-title-container'>
            <h3>{props.titulo}</h3>

            <div className='card-item-text-icon' >
            <CalendarMonthIcon fontSize='small'/>
            <label>{props.fecha + " - " +  props.duracion}</label>
            </div>
            </div>

            <div>

            <p className='card-item-text-desc'>{props.descripcion}</p>
            
            
           
         

         
            
            </div>
           
        </div>

        <div className='card-footer'>
          

          
            
         
          
          <div className='card-item-button-container'>
          <label className='card-item-text-price one'>{props.precio}</label>
          
          <label className='three'>@{props.propietario}</label>
          <button className='card-item-button two' >Comprar</button>
          
          </div>
          
        </div>

    </div>
  )
}
