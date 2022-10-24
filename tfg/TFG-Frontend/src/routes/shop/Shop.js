import React, { useState,useEffect } from "react";
import "./Shop.css";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { IconButton } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  Divider,
  Pagination
} from "@mui/material";
import axios from '../../components/axios'
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import Slider from '@mui/material/Slider';
//import Item from "../../components/items/Item";
import SearchIcon from '@mui/icons-material/Search';
import Item from "./Item.js";

const Shop = () => {
  //Variables de estado
  const [selectedDate, setSelectedDate] = useState(null);
  const [duracion, setDuracion] = useState(null);
  const [page, setPage] = React.useState(1);
  const [items, setItems] = useState([]);

  //Búsqueda

  const [form, setForm] = useState({
    titulo: "",
      fechaInicial: null,
      fechaFinal: null,
      personas: 0,
      intercambio: false,
      oficial: true
  });

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  const itemsPerPage = 6;
  const handleChange = (event, value) => {
    setPage(value);
  };
  

  useEffect(() => {
    axios.get("/item").then(res => {
      setItems(res.data)
  
   
    })
  }, [])

  //Función para enviar los datos al servidor
  async function onSubmit(e) {
    e.preventDefault();

    //Petición post con axios
    axios.post('/search', {
      titulo: form.titulo,
      fechaInicial: form.fechaInicial,
      fechaFinal: form.fechaFinal,
      personas: form.personas,
      intercambio: form.intercambio,
      oficial: form.oficial,
      
    }).then(function (response) {
      console.log(response.data)
      setItems(response.data)

    }) }



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
                    updateForm({ titulo: e.target.value })
                  }}
              />
            </div>

            <div className="shopBar__margin">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha de inicio"
                  value={form.fechaInicial}
                  onChange={(e) => {
                    updateForm({ fechaInicial: e })
                  }}
                  renderInput={(params) => <TextField {...params} size="small" />}
                  
                />
              </LocalizationProvider>
            </div>

            <div className="shopBar__margin">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha de finalización"
                  value={form.fechaFinal}
                  onChange={(e) => {
                    updateForm({ fechaFinal: e })
                  }}
                  renderInput={(params) => <TextField {...params}  size="small" />}
                 
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
                    updateForm({ personas: e.target.value })
                  }}
              />
            </div>
         

            <FormGroup row={true}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Oficiales"
                size="small"
                value={form.oficial}
                  onChange={() => {
                    updateForm({ oficial: !form.oficial })
                  }}
              />
              <FormControlLabel control={<Checkbox />} label="Intercambio" size="small" value={form.intercambio}
                  onChange={() => {
                    updateForm({ intercambio: !form.intercambio})
                  }}/>
            </FormGroup>

            <button className='search-item-button' type="submit" ><SearchIcon/></button>
          </form>
        </div>

       

        <div className="shopItem__container">

        <div className="shopItem__row">
        
        {items.slice((page - 1) * itemsPerPage, (page - 1) * itemsPerPage + 3).map((item, i) => {
          
          
          
             return <Item prop = {item} key={i}/>
       
        })}
      </div>

      <div className="shopItem__row">
        
        {items.slice((page - 1) * itemsPerPage + 3, (page) * itemsPerPage ).map((item, i) => {
          
             return <Item prop = {item} key={i}/>
       
        })}
      </div>


          
        </div>
        
        <div className="shop__footer">
        
        <Pagination
          count={ Math.ceil(items.length / itemsPerPage)}
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

export default Shop;
