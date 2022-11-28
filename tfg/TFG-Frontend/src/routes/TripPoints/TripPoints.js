import React from 'react'
import TripCard from './TripCard'
import "./TripPoints.css"

//Dialog imports

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { addPoints } from "../../Controlador";
import { useNavigate } from 'react-router-dom';



export default function TripPoints() {

    //Variables dialog
    const [open, setOpen] = React.useState(false);
    const [total,setTotal] = React.useState(0)
    const [puntos,setPuntos] = React.useState(0)
    const navigate = useNavigate();
    const handleClickOpen = () => {
        setOpen(true);
    }
    
      const handleClose = () => {
        setOpen(false);
        setTotal(0);
      };

      const handlePurchase = () => {
        addPoints(puntos).then((result) => {
            
            localStorage.setItem("points",result.data.points)
            navigate(0)
        })
      }







  return (

    //Dialog cantidad personalizada
<>
<Dialog open={open} onClose={handleClose}>
        <DialogTitle>Añadir TripPoints</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Recuerde que TripTrades se lleva un porcentaje del 5% de sus compras.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="tripPoints"
            label="TripPoints"
            type="number"
            fullWidth
            variant="standard"
            
            onChange={(e) => {setTotal((e.target.value * 1.05).toFixed(2) );
            setPuntos(e.target.value)}}
            InputProps={{ inputProps: { min: 1, max: 2000 } }}
          />

          <div style={{display:"flex", flexDirection:"column",justifyContent:"center", alignItems:"center", marginTop:"10px"}}>
            <h2>Importe a pagar:</h2>
            <p>{total}</p>
          </div>
        </DialogContent>
       
            <div style={{display:"flex",justifyContent:"space-evenly", alignItems:"center", marginBottom:"20px"}}>
          <button className='tripPoints-button' onClick={handleClose}>Cancelar</button>
          <button className='tripPoints-button' onClick={handlePurchase}>Comprar</button>
          </div>
      
      </Dialog>


    




    <div className='tripPoints'>
    <div className='tripPoints-container' >
        <div className='tripPoints-container-header'>
        <h1 className='tripPoints-title'>Monedero de TripPoints</h1>
        </div>
        <div className='tripPoints-container-body'>

       
        <div className='tripPoints-firstContainer'>
    <TripCard precio = "10"/>
    <TripCard precio  = "25"/>
    <TripCard precio  = "50"/>
    </div>
    <div className='tripPoints-secondContainer'>
    <TripCard precio  = "100"/>
    <TripCard precio  = "250"/>
    </div>
    
    </div>
    <div className='tripPoints-container-footer'>
    <button className='tripPoints-button' onClick={handleClickOpen}>Cantidad personalizada</button>
    </div>
    </div>
    </div>
    </>
  )
}
