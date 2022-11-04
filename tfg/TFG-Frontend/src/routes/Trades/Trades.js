import React, { useState,useEffect } from "react";
import { DataGrid, esES } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Card from "../shop/Item";
import { aceptarIntercambio, rechazarIntercambio,getMessages, getUsuario } from "../../Controlador";
import "./Trades.css"
const Trades = () => {

  const [messages, setMessages] = useState([]);
  const [rows, setRows] = useState([])
  const [open, setOpen] = React.useState(false);
  const[tradeSeleccionado, setTradeSeleccionado] = useState("")
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    
    setOpen(false);
    
  };

  const aceIntercambio = () => {

    aceptarIntercambio(tradeSeleccionado).then(
      navigate(0)
    ).catch(

    )


  }
  

  const reIntercambio = () => {
   
    rechazarIntercambio(tradeSeleccionado).then(
      navigate(0)
    ).catch(
      
    )
  }




    const button = (funcion) => {
        return <button className='trades-button' onClick={funcion}>Consultar</button>
      }

      


      useEffect(() => {
        //Obtenemos los items 
      
        getMessages()
        .then(res => {
          setRows(rowsCharge(res.data))
          setMessages(res.data)
          
      
          
          
        
       
        })
        
        const rowsCharge = (data) => {

          let filas = [];
         
          
          for(let message of data.result){
          console.log(message)
            let item = {
              id: message._id,
              propietario: message.propietario,
              cliente: message.comprador,
              title1: message.itemPropietario.titulo,
              title2: message.itemComprador.titulo,
              fecha: message.fecha,
              estado: message.estado,
              consulta: () => {
                setTradeSeleccionado(message)
                handleClickOpen()
              }
            
              
            }
  
            filas.push(item);
            
          }
  
          return filas;
        }

      

      }, [])

    const columns = [
        { field: 'id', headerName: 'ID', width: 70,headerAlign: 'center', align: 'center', },
        { field: 'propietario', headerName: 'Propietario', width: 330,headerAlign: 'center', align: 'center', },
        { field: 'cliente', headerName: 'Cliente', width: 330,headerAlign: 'center', align: 'center', },
        {
          field: 'fecha',
          headerName: 'Fecha de solicitud',
          type: 'date',
          width: 150,
          headerAlign: 'center',
          align: 'center',
        },

        {
            field: 'title1',
            headerName: 'Titulo del viaje ofertado',
            width: 250,
            headerAlign: 'center',
            align: 'center',
          },

          {
            field: 'title2',
            headerName: 'Titulo del viaje ofrecido',
            width: 250,
            headerAlign: 'center',
            align: 'center',
          },

          {
            field: 'estado',
            headerName: 'Estado',
            width: 250,
            headerAlign: 'center',
            align: 'center',
          },
        {
          field: 'consulta',
          headerName: 'Consultar solicitud',
          description: 'Te permite comprobar la solicitud original',
          sortable: false,
          width: 280,
          headerAlign: 'center',
          align: 'center',
          renderCell: (params) => {
            const onClick = (e) => {
              e.stopPropagation(); // don't select this row after clicking
      
              const api =  params.api;
              const thisRow =  {};
      
              api
                .getAllColumns()
                .filter((c) => c.field !== "__check__" && !!c)
                .forEach(
                  (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
                );

             thisRow.consulta()
            }
          return <button  className='trades-button' onClick={onClick}>Consultar</button>
        },
        
      }
      ];

     

      


      
      

    return (
      <div>

        {/*Dialog intercambio*/}
      <Dialog
        open={open}
        fullWidth
        maxWidth={"md"}
        PaperProps={{
          sx: {
            maxHeight: 1000,
          },
        }}
        onClose={handleClose}
      >
        <DialogTitle>Propuesta de intercambio</DialogTitle>
        <DialogContent>
          {tradeSeleccionado.propietario === getUsuario() ? (
            <DialogContentText>
             Usted puede aceptar o rechazar la propuesta ofrecida por el usuario {tradeSeleccionado.cliente}
            </DialogContentText>
            ) : (
              <DialogContentText>
              Usted puede cancelar el intercambio ofrecido al usuario {tradeSeleccionado.propietario}
             </DialogContentText>
            )
          }
          
          <div
            style={{
              display: "flex",
              marginBottom: "5px",
              justifyContent: "space-around",
              marginTop: "10px",
              marginLeft: "30px",
              marginRight: "20px",
            }}
          >
            <h2 style={{ marginLeft: "50px" }}>Tu propuesta</h2>

            <h2 style={{ marginRight: "40px" }}>Paquete ofertado</h2>
          </div>
          <div
            style={{
              display: "flex",
              marginBottom: "5px",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <Card item={tradeSeleccionado.itemPropietario} location={"Consulta"} />
            <Card item={tradeSeleccionado.itemComprador} location={"Consulta"} />
          </div>
          
          
           
        
        </DialogContent>
        <div
            style={{
              display: "flex",
              marginBottom: "5px",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
        <DialogActions>

        {tradeSeleccionado.estado !== "Pendiente" ? (
          <div>
             <button
             className="card-item-button"
             style={{ marginRight: "100px" }}
             onClick={handleClose}
           >
             Regresar
           </button>
           </div>
            ) : tradeSeleccionado.propietario === getUsuario() ? (
              <div>
              <button
                className="card-item-button"
                style={{ marginRight: "100px" }}
                onClick={reIntercambio}
              >
                Cancelar
              </button>
              

              <button
                className="card-item-button"
                style={{ marginLeft: "100px" }}
                onClick={aceIntercambio}
              >
                Aceptar
              </button>
              </div>
            ) : (<div>

                <button
                className="card-item-button"
                style={{ marginRight: "100px" }}
                onClick={handleClose}
              >
                Regresar
              </button>
              

              <button
                className="card-item-button"
                style={{ marginLeft: "100px" }}
                onClick={reIntercambio}
              >
                Cancelar Intercambio
              </button>


            </div>)
          }
              
            </DialogActions>
            </div>
      </Dialog>
    

        <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={ rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        localeText = {esES.components.MuiDataGrid.defaultProps.localeText}
        
      />
    </div>
    </div>


    )


}

export default Trades;
