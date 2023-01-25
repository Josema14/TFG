import React from 'react'
import "./TripCard.css"


import Card from '@mui/material/Card';

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { addPoints, substractPoints } from "../../Controlador";
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { requirePropFactory } from '@mui/material';




export default function TripCard(props) {

    
    const [open, setOpen] = React.useState(false);
    const [total,setTotal] = React.useState(0);
    const [puntos,setPuntos] = React.useState(0)
    const image  = props.url;
    const navigate = useNavigate();
    
    let titulo = "Extraer TripPoints";
    if(props.tipo === "Add"){
      titulo = "Añadir TripPoints"
    }
 

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

    const handleSubstraction = () => {
      substractPoints(puntos).then((result) => {
          
          localStorage.setItem("points",result.data.points)
          navigate(0)
      })
    }



  return (
    <>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{titulo}</DialogTitle>
        {((props.tipo === "Add") ?(
          <>
        <DialogContent>
          <DialogContentText>
          Recuerde que TripTrades se lleva un porcentaje del 5% de su ingreso.
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

          <div style={{display:"flex", flexDirection:"column",justifyContent:"center", alignItems:"center", marginTop:"20px"}}>
            <h3>Importe a pagar:</h3>
            
            <h2 style={{marginTop:"10px"}}>{total}€</h2>
          </div>
        </DialogContent>
       
            <div style={{display:"flex",justifyContent:"space-evenly", alignItems:"center", marginBottom:"20px",marginTop:"10px"}}>
          <button className='tripPoints-button' onClick={handleClose}>Cancelar</button>
          <button className='tripPoints-button' onClick={handlePurchase}>Añadir</button>
          </div>
          </> ):
          (
          <>
          <DialogContent>
            <DialogContentText>
            Puede extraer la cantidad de TripPoints que prefiera sin coste adicional.
            </DialogContentText>
  
         
            <TextField
              autoFocus
              margin="dense"
              id="tripPoints"
              label="TripPoints"
              type="number"
              fullWidth
              variant="standard"
              
              onChange={(e) => {setTotal((e.target.value));
              setPuntos(e.target.value)}}
              InputProps={{ inputProps: { min: 1, max: 2000 } }}
            />
  
            <div style={{display:"flex", flexDirection:"column",justifyContent:"center", alignItems:"center", marginTop:"20px"}}>
              <h3>Importe total a extraer:</h3>
              <h2 style={{marginTop:"10px"}}>{total}€</h2>
            </div>
          </DialogContent>
         
              <div style={{display:"flex",justifyContent:"space-evenly", alignItems:"center", marginBottom:"20px",marginTop:"10px"}}>
            <button className='tripPoints-button' onClick={handleClose}>Cancelar</button>
            <button className='tripPoints-button' onClick={handleSubstraction}>Extraer</button>
            </div>
            </>
          )
          
          
           )}
      
      </Dialog>


    <div className='tripCard-container'>
     
     <Card sx={{ maxWidth: 275 }} className="TripCard" onClick={handleClickOpen}>
      <CardMedia
        component="img"
        height="140"
        image={require("./" + props.url)}
        alt="Imagen decorativa TripPoints"
      />
      <CardContent sx={{ height: 150 }} >
        <Typography gutterBottom variant="h4" fontWeight={"Bold"} component="div" align="center" className='tripPoints-title' fontFamily={'Dancing Script'} >
          {props.titulo}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {props.description}
        </Typography>
      </CardContent>
  
    
    </Card>





    </div>
    </>
  )
}
