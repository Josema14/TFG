import React from 'react'
import "./Item.css"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from '../../components/axios'


import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
export default function Card(props) {

  const navigate = useNavigate();

  

  const LOCATION = props.location

  let item = props.item;
  const [open, setOpen] = React.useState(false);

  const [producto, setProducto] = React.useState("");
  const [inventario, setInventario] =  React.useState([]);
  const handleClickOpen = () => { 
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setProducto("");
  };
  
  const handleProduct = (event) => {
    setProducto(event.target.value);
  };

 
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
      _id: item._id,
    }).then(() => {
      navigate("/inventory");
    }).catch( (e)=>{
      alert("Ya tienes este paquete en tu inventario")
    }

    )

    
  }


  function setIntercambio(){

    //Obtenemos el usuario

    let email = localStorage.getItem("email");
    
  
    //Si no está logueado nos reenvía al inicio de sesión.
    if (email === "null"){
      navigate("/login");
      return
    }

    //Enviamos el usuario y el id del viaje

    axios.post('/setChange',{
      email: email,
      _id: item._id,
    }).then(() => {

      //Se ha añadido con éxito
     
      navigate(0);
    }).catch((e) => {
      //Ha surgido un error
      alert("El paquete no es apto para intercambio "  + e.message);

    })


  }

  function cancelarIntercambio(){

    //Obtenemos el usuario

    let email = localStorage.getItem("email");
    
  
    //Si no está logueado nos reenvía al inicio de sesión.
    if (email === "null"){
      navigate("/login");
      return
    }

    //Enviamos el usuario y el id del viaje

    axios.post('/removeChange',{
      email: email,
      _id: item._id,
    }).then(() => {

      //Se ha añadido con éxito
     
      navigate(0);
    }).catch((e) => {
      //Ha surgido un error
      alert("El intercambio no se ha podido cancelar "  + e.message);

    })


  }

  function intercambiar(){

     //Obtenemos el usuario

     let email = localStorage.getItem("email");
    
  
     //Si no está logueado nos reenvía al inicio de sesión.
     if (email === "null"){
       navigate("/login");
       return
     }

    axios.post('/inventory',{
      email: email,
      precio: item.precio,
    }).then((res) => {
      
      let newArray = [...res.data.itemsPrecio]
     
      setProducto(newArray[0])
      setInventario(newArray)
     


      //Se ha añadido con éxito
      handleClickOpen()
    
    }).catch((e) => {
      //Ha surgido un error
      alert("El intercambio no se ha podido cancelar "  + e.message);

    })

    


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

        {/*Dialog intercambio*/}
      <Dialog open={open} fullWidth  maxWidth = {"md"}  PaperProps={{
    sx: {
     
      maxHeight: 1000
    }
  }} onClose={handleClose}>
        <DialogTitle>Propuesta de intercambio</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Usted debe elegir un paquete de los que hemos preseleccionado de su inventario que cumple los requisitos de nuestra empresa.
          </DialogContentText>
          <div style={{display : "flex", marginBottom : "5px", justifyContent : "space-around", marginTop : "10px", marginLeft : "30px", marginRight: "20px"}}>
          <h2 style={{marginLeft: "50px"}}>Tu propuesta</h2>
          
          <h2 style={{marginRight: "40px"}}>Paquete ofertado</h2>

          </div>
          <div style={{display : "flex", marginBottom : "5px", justifyContent : "center", marginTop : "10px"}}>
          <Card item = {producto} location = {LOCATION}/>
          <Card item = {item} location = {LOCATION}/>
          </div>
          <div style={{display : "flex", marginTop : "10px", justifyContent : "center"}}>
          <DialogActions>
          <button className='card-item-button' style={{marginRight:"100px"}} onClick={handleClose}>Cancelar</button>
          <Select
          labelId="demo-simple-select-label-big"
          id="demo-simple-select-big"
          value={producto}
          label="Inventario"
          onChange={handleProduct}
        >
          {inventario.map((item, key) => {
           
            return <MenuItem value={item} key = {key}>{item.titulo}</MenuItem>
          })}
          
        
       
        
        </Select>
         
        <button className='card-item-button' style={{marginLeft:"100px"}} onClick={handleClose}>Aceptar</button>
      </DialogActions>
         </div>
        </DialogContent>
        
   
      </Dialog>







        <div className='card-item-image-container'>

        <img src={item.imagen} alt="Imagen Viaje"/>

        </div>

        <div className='card-item-text-container'>
          <div className='card-item-text-header'>
            <div>
          <span className='tag'> {item.tipo}</span>
          <span className='tag'><a className='card-item-place' href={"https://www.google.es/maps/place/" + item.ubicacion} target="_blank" rel="noreferrer">{item.ubicacion}</a></span>
          </div>

        
          <div className='card-item-text-icon'>
          <PersonIcon fontSize="small"/> 
          <span>{item.personas}</span>
          </div>


          </div>
          
            <div className='card-item-title-container'>
            <h3>{item.titulo}</h3>

            <div className='card-item-text-icon' >
            <CalendarMonthIcon fontSize='small'/>
            <label>{formatDate(item.fechaInicio) + " - " +  formatDate(item.fechaFinal)}</label>
            </div>
            </div>

            <div style={{"marginLeft" : "5px"}}>

            <p className='card-item-text-desc'>{item.descripcion}</p>
            
            
           
         

         
            
            </div>
           
        </div>

        <div className='card-footer'>
          

          
            
         
          
          <div className='card-item-price-container' >
        
          <label className='card-item-text-price one'>{item.precio}€</label>
          </div>
          <div className='card-item-button-container'>
          <label className='three'>@{item.propietario}</label>
         
          {(LOCATION !== "inventory") ? ((item.tipo === "Intercambio") ? <button className='card-item-button two' onClick={intercambiar} >Intercambiar</button> : <button className='card-item-button two' onClick={comprar} >Comprar</button>) : ((item.tipo === "Intercambio") ? <button className='card-item-button two' onClick={cancelarIntercambio} >Cancelar intercambio</button> : <button className='card-item-button two' onClick={setIntercambio} >Intercambiar</button>)
          
  }
          </div>
          
        </div>

    </div>
  )
  

}
