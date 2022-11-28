import React from 'react'
import "./TripCard.css"


import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { addPoints } from "../../Controlador";
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';




export default function TripCard(props) {

    let precioFinal =  Number(props.precio) * 1.05

    const navigate = useNavigate();
    const handlePurchase = () => {
        addPoints(props.precio).then((result) => {
            
            localStorage.setItem("points",result.data.points)
            navigate(0)
        })
      }


  return (
    <div className='tripCard-container'>
     
     <Card sx={{ maxWidth: 275 }}>
      <CardMedia
        component="img"
        height="140"
        image="https://cdn.vox-cdn.com/thumbor/KQR_ddMDxMRQPF8Mj1VSJ_1lBpQ=/1400x1050/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/21961809/GenshinImpact_2020_10_15_14_51_39.png"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" align="center" >
          {props.precio} TripPoints
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Recuerde que TripTrades se lleva un porcentaje del 5% de sus compras.
        </Typography>
      </CardContent>
     <div className='tripCard__actions'>
        <button className='tripCard-button' onClick={handlePurchase}>{ precioFinal}€</button>
      </div>
    
    </Card>





    </div>
  )
}
