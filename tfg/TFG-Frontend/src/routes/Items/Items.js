import React, { useState, createRef  } from "react";
import "./Items.css";

import TextField from "@mui/material/TextField";


import { Box } from "@mui/system";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {  useNavigate } from "react-router-dom";

import { uploadItem } from "../../Controlador";
export default function Items() {

  const [imageText,setImageText] = useState("Use el botón para subir una imagen.")
  const [form, setForm] = useState({
    titulo: "",
    ubicacion: "",
    fechaInicial: null,
    duracion: 1,
    personas: 1,
    tripPoints:10,
    descripcion:"",
    cantidad:1,
    imagen: null
    
  });

  const inputFileRef = createRef(null);

  const navigate = useNavigate();

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  function onSubmit() {
    
    if(form.imagen === null){ console.log("entro");setImageText("Debe introducir una imagen para la publicación."); return }
    
    uploadItem(form).then((res) => {
      //navigate("/")
    });
  }

 


  let today = new Date();

  return (
    <div className="item-background">
      <form action="#" onSubmit={onSubmit} className="item-form-container">
        <div className="item-form-container-header">
          <h1>Nueva Publicación</h1>
          <hr className="item-form-container-header-hr"/>
        </div>
      
        <div className="item-form-container-body">
          {/* Título + Ubicación */}
          <div className="item-form-container-body-row">
            {/* Título */}
            <div>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              
                <TextField
                  id="input-with-sx"
                  label="Título"
                  variant="standard"
                  value={form.titulo}
                  onChange={(e) => updateForm({ titulo: e.target.value })}
                  type="text"
                  style={{ marginRight:"25px"}}
                  required
                  fullWidth
                />
              </Box>
            </div>

            {/* Ubicación */}
            <div>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                
                <TextField
                  id="input-with-sx"
                  label="Ubicación"
                  variant="standard"
                  value={form.ubicacion}
                  onChange={(e) => updateForm({ ubicacion: e.target.value })}
                  type="text"
                  required
                  fullWidth
                />
              </Box>
            </div>
          </div>
          {/* Fecha de inicio + duración //Usar datepicker */}
          <div className="item-form-container-body-row">
            <div>
              {/*Fecha inicio */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha de inicio"
                  value={form.fechaInicial}
                  onChange={(e) => {
                    updateForm({ fechaInicial: e });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      style={{ marginRight:"30px"}}
                      required
                    />
                  )}
                
                  inputFormat="DD/MM/YYYY"
                  minDate={today.setDate(today.getDate() + 30)}
                />
              </LocalizationProvider>
            </div>

            {/* Duración */}
            <div>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                
                <TextField
                  id="input-with-sx"
                  label="Duración"
                  variant="standard"
                  value={form.duracion}
                  onChange={(e) => 
                    updateForm({ duracion: e.target.value })}
                  type="number"
                  required
                  style={{ width: "100px", marginLeft:"30px" }}
                />
              </Box>
            </div>
          </div>

          {/* Número de personas + TripPoints + Existencias */}
          <div className="item-form-container-body-row">
            {/* Número de personas */}
            <div>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <TextField
                  id="input-with-sx"
                  label="Personas"
                  variant="standard"
                  InputProps={{ inputProps: { min: 1, max: 5 } }}
                  size="small"
                  value={form.personas}
                  onChange={(e) => 
                    {
                      if (e.target.value > 5) e.target.value = 5;
                      else if(e.target.value === "" || e.target.value <1) e.target.value = 1;
                    updateForm({ personas: e.target.value })}}
                  type="number"
                  required
                  style={{ width: "100px" }}
                />
              </Box>
            </div>

            {/* TripPoints */}
            <div>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <TextField
                  id="input-with-sx"
                  label="TripPoints"
                  variant="standard"
                  InputProps={{ inputProps: { min: 10, max: 2000 } }}
                  size="small"
                  value={form.tripPoints}
                  onChange={(e) => 
                    {
                      if (e.target.value > 2000) e.target.value = 2000;
                      else if(e.target.value === "" || e.target.value <0) e.target.value = 10;
                    updateForm({ tripPoints: e.target.value })}}
                  type="number"
                  required
                  style={{ width: "100px" }}
                />
              </Box>
            </div>

            {/* Existencias */}
            <div>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <TextField
                  id="input-with-sx"
                  label="Existencias"
                  variant="standard"
                  value={form.cantidad}
                  onChange={(e) => 
                    {
                      if (e.target.value > 10) e.target.value = 10;
                      else if(e.target.value === "" || e.target.value <1) e.target.value = 1;
                    updateForm({ cantidad: e.target.value })}}
                  type="number"
                  required
                  style={{ backgroundColor: "white", width: "100px" }}
                />
              </Box>
            </div>
          </div>

           {/* Imagen */}
           <div className="item-form-container-body-image">
            <p>{imageText}</p>
            <label htmlFor="file-upload" className="item-form-container-body-image-label">
              Subir Imagen
            </label>
            <input id="file-upload" type="file"  accept="image/*" ref={inputFileRef} onChange={(e) =>{ 
              
              const newImage = e.target?.files?.[0];
              
              updateForm({ imagen: newImage })}
          }/>
          </div>
        </div>

          {/* Descripción */}
          <div className="item-form-container-body-desc">
            <TextField
              id="input-with-sx"
              label="Descripción"
              multiline
              rows={3}
              filled="true"
              value={form.descripcion}
              onChange={(e) => updateForm({ descripcion: e.target.value })}
              type="text"
              required
              style={{ backgroundColor: "white", width: "75%" }}
            />
          </div>

         

        <div className="item-form-container-footer">
        
          <button type="submit" className="item-form-container-footer-button">Enviar publicación</button>
        </div>
      </form>
    </div>
  );
}
