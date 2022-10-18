import React from 'react'
import "./Item.css"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
export default function Card(props) {


  

  const prop = props.prop;
  


  
  

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }


function formatDate(date) {
    var start = new Date(date)
    return [
      start.getFullYear(),
      padTo2Digits(start.getMonth() + 1),
      padTo2Digits(start.getDate()),
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
          <span className='tag'><a className='card-item-place' href={"https://www.google.es/maps/place/" + prop.pais} target="_blank" rel="noreferrer">{prop.pais}</a></span>
          </div>

        
          <div className='card-item-text-icon'>
          <PersonIcon fontSize="small"/> 
          <span>{prop.person}</span>
          </div>


          </div>
          
            <div className='card-item-title-container'>
            <h3>{prop.nombre}</h3>

            <div className='card-item-text-icon' >
            <CalendarMonthIcon fontSize='small'/>
            <label>{prop.fecha + " - " +  prop.duracion}</label>
            </div>
            </div>

            <div>

            <p className='card-item-text-desc'>{prop.descripcion}</p>
            
            
           
         

         
            
            </div>
           
        </div>

        <div className='card-footer'>
          

          
            
         
          
          <div className='card-item-button-container'>
          <label className='card-item-text-price one'>{prop.precio}</label>
          
          <label className='three'>@{prop.propietario}</label>
          <button className='card-item-button two' >Comprar</button>
          
          </div>
          
        </div>

    </div>
  )
  

}
