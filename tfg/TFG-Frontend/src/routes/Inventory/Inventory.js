import React, { useState, useEffect } from "react";
import "../shop/Shop.css";


import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  TextField,
  Pagination,

} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import SearchIcon from "@mui/icons-material/Search";
//import Item from "../../components/items/Item";

import Item from "../shop/Item";
import { getInventory,searchUserItems } from "../../Controlador";

const Inventory = () => {
  //Variables de estado
  const [page, setPage] = React.useState(1);
  const [items, setItems] = useState([]);
  const LOCATION = "inventory";
  //Búsqueda

  const itemsPerPage = 6;
  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    getInventory().then((res) => {
      
      setItems(res.data.items);
    });
  }, []);

    //Búsqueda

    const [form, setForm] = useState({
      titulo: "",
      fechaInicial: null,
      fechaFinal: null,
      personas: 0,
      intercambio: true,
      publicados: true,
      oficial: true,
      precioMinimo: 0,
      precioMaximo: 2000,
    });
  
    function updateForm(value) {
      return setForm((prev) => {
        return { ...prev, ...value };
      });
    }


    //Función para enviar los datos al servidor
  async function onSubmit(e) {
    e.preventDefault();
    let fechaInicial =form.fechaInicial
    let fechaFinal = form.fechaFinal

    if(form.fechaInicial !== null) fechaInicial = form.fechaInicial.format('YYYY-MM-DD')
    if(form.fechaFinal !== null) fechaFinal = form.fechaFinal.format('YYYY-MM-DD')

    console.log(form)
    
    searchUserItems(
      form.titulo,
      fechaInicial,
      fechaFinal,
      form.personas,
      form.intercambio,
      form.oficial,
      
      form.precioMinimo,
      form.precioMaximo,
      form.publicados,
    ).then(function (response) {
      setItems(response.data.items);
     
      setPage(1);
    });
    
  }

  

  return (
    <div className="shop">
      <div className="shop__body">
        <div className="searchBar__container">

        <form className="searchForm__container" onSubmit={onSubmit}>
            <div className=" shopBar__margin">
              <TextField
                id="outlined-basic"
                label="Destino"
                variant="outlined"
                size="small"
                value={form.titulo}
                onChange={(e) => {
                  updateForm({ titulo: e.target.value });
                }}
              />
            </div>

            <div className="shopBar__margin">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Rango inicial..."
                  value={form.fechaInicial}
                  onChange={(e) => {
                    updateForm({ fechaInicial: e });
                  }}
                  renderInput={(params) => (
                    <TextField {...params} size="small"  style={{ width: "155px" }} />
                  )}
                  inputFormat="DD/MM/YYYY"
                  minDate={new Date()}
                  
                />
              </LocalizationProvider>
            </div>

            <div className="shopBar__margin">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Rango final..."
                  value={form.fechaFinal}
                  onChange={(e) => {
                    updateForm({ fechaFinal: e});
                  }}
                  renderInput={(params) => (
                    <TextField {...params} size="small" style={{ width: "155px" }} />
                  )}
                  inputFormat="DD/MM/YYYY"
                  minDate={new Date()}
                 
                />
              </LocalizationProvider>
            </div>

            <div className="shopBar__margin">
              <TextField
                id="outlined-basic"
                label="Personas"
                variant="outlined"
                type="number"
                InputProps={{ inputProps: { min: 0, max: 5 } }}
                size="small"
                value={form.personas}
                onChange={(e) => {
                  if (e.target.value > 5) e.target.value = 5;
                  else if(e.target.value === "" || e.target.value <0) e.target.value = 0;
                  updateForm({ personas: e.target.value });
                }}
                style={{ width: "80px" }}
              />
            </div>

                <hr style={{ marginLeft:"20px" }}/>
            <div className="shopBar__margin">
              <TextField
                id="outlined-basic"
                label="Precio mínimo"
                variant="outlined"
                type="number"
                InputProps={{ inputProps: { min: 0, max: 2000 } }}
                size="small"
                value={form.precioMinimo}
                onChange={(e) => {
                  if (e.target.value > 2000 ) e.target.value = 2000;
                  else if(e.target.value === "") e.target.value = 0;
                  updateForm({ precioMinimo: e.target.value });
                }}
                style={{ width: "150px", marginLeft:"20px" }}
              />
            </div>
            <div className="shopBar__margin">
              <TextField
                id="outlined-basic"
                label="Precio máximo"
                variant="outlined"
                type="number"
                InputProps={{ inputProps: { min: 0, max: 2000 } }}
                size="small"
                value={form.precioMaximo}
                onChange={(e) => {
                  
                  if (e.target.value > 2000 || e.target.value === "") e.target.value = 2000;
                  updateForm({ precioMaximo: e.target.value });
                }}
                style={{ width: "150px" }}
              />
            </div>

            <FormGroup column="true">
              <FormControlLabel
                control={<Checkbox defaultChecked  style={{
                  transform: "scale(0.7)",
              }} />}
                label={<span style={{ fontSize: '15px' }}>Inventario</span>}
                size="small"
                value={form.oficial}
                onChange={() => {
                  updateForm({ oficial: !form.oficial });
                }}

                style={{
                  height : "15px",
              }} 
              />
              <FormControlLabel
                control={<Checkbox  defaultChecked  style={{
                  transform: "scale(0.7)",
                 
              }} />}
                label={<span style={{ fontSize: '15px' }}>Intercambio</span>}
                size="small"
                value={form.intercambio}
                onChange={() => {
                  updateForm({ intercambio: !form.intercambio });
                }}
                style={{
                  height : "15px",

                 }}
              />

<FormControlLabel
                control={<Checkbox  defaultChecked  style={{
                  transform: "scale(0.7)",
              }} />}
                label={<span style={{ fontSize: '15px' }}>Publicaciones</span>}
                size="small"
                value={form.publicados}
                onChange={() => {
                  updateForm({ publicados: !form.publicados });
                }}
                style={{
                  height : "15px",
              }} 
              />
               
               

          
            </FormGroup>

            

            <button className="search-item-button" type="submit">
              <SearchIcon />
            </button>
          </form>









        </div>

        <div className="shopItem__container">
          <div className="shopItem__row">
            {items
              .slice((page - 1) * itemsPerPage, (page - 1) * itemsPerPage + 3)
              .map((item, i) => {
                return <Item item={item} location={LOCATION} key={i} />;
              })}
          </div>

          <div className="shopItem__row">
            {items
              .slice((page - 1) * itemsPerPage + 3, page * itemsPerPage)
              .map((item, i) => {
                return <Item item={item} location={LOCATION} key={i} />;
              })}
          </div>
        </div>

        <div className="shop__footer">
          <Pagination
            count={Math.ceil(items.length / itemsPerPage)}
            page={page}
            onChange={handleChange}
            defaultPage={1}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </div>
      </div>
    </div>
  );
};

export default Inventory;
