import React, { useState } from "react";
import "./Items.css";

import TextField from "@mui/material/TextField";
import KeyIcon from "@mui/icons-material/Key";
import EmailIcon from "@mui/icons-material/Email";
import { Box } from "@mui/system";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
export default function Items() {
  const [form, setForm] = useState({
    titulo: "",
    fechaInicial: null,
    fechaFinal: null,
    personas: 0,
    intercambio: true,
    oficial: true,
    precioMinimo: 0,
    precioMaximo: 2000,
  });

  let today = new Date();

  return (
    <div className="item-background">
      <div className="item-form-container">
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
                  //value={form.email}
                  //onChange={(e) => updateForm({ email: e.target.value })}
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
                  //value={form.email}
                  //onChange={(e) => updateForm({ email: e.target.value })}
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
                    //updateForm({ fechaInicial: e });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      style={{ marginRight:"30px"}}
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
                  //value={form.email}
                  //onChange={(e) => updateForm({ email: e.target.value })}
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
                  InputProps={{ inputProps: { min: 0, max: 5 } }}
                  size="small"
                  //value={form.email}
                  //onChange={(e) => updateForm({ email: e.target.value })}
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
                  //value={form.email}
                  //onChange={(e) => updateForm({ email: e.target.value })}
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
                  //value={form.email}
                  //onChange={(e) => updateForm({ email: e.target.value })}
                  type="number"
                  required
                  style={{ backgroundColor: "white", width: "100px" }}
                />
              </Box>
            </div>
          </div>

           {/* Imagen */}
           <div className="item-form-container-body-image">
            <p>Imagen</p>
            <label for="file-upload" class="item-form-container-body-image-label">
              Subir Imagen
            </label>
            <input id="file-upload" type="file"  accept="image/*"/>
          </div>
        </div>

          {/* Descripción */}
          <div className="item-form-container-body-desc">
            <TextField
              id="input-with-sx"
              label="Descripción"
              multiline
              rows={3}
              filled
              //value={form.email}
              //onChange={(e) => updateForm({ email: e.target.value })}
              type="text"
              required
              style={{ backgroundColor: "white", width: "75%" }}
            />
          </div>

         

        <div className="item-form-container-footer">
        
          <button className="item-form-container-footer-button">Enviar publicación</button>
        </div>
      </div>
    </div>
  );
}
