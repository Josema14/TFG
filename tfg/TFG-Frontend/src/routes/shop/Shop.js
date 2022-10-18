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

//import Item from "../../components/items/Item";
import Item from "./Item.js";

const Shop = () => {
  //Variables de estado
  const [selectedDate, setSelectedDate] = useState(null);
  const [duracion, setDuracion] = useState(null);
  const [page, setPage] = React.useState(1);
  const [items, setItems] = useState([]);

  const itemsPerPage = 6;
  const handleChange = (event, value) => {
    setPage(value);
  };
  

  useEffect(() => {
    axios.get("/item").then(res => {
      setItems(res.data)
  
   
    })
  }, [])



  return (
    <div className="shop">
      <div className="shop__body">
        <div className="searchBar__container">
          <form className="searchForm__container">
            <div>
              <TextField
                id="outlined-basic"
                label="Destino"
                variant="outlined"
              />

              <IconButton>
                <HighlightOffIcon />
              </IconButton>
            </div>

            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha de Inicio"
                  value={selectedDate}
                  onChange={(newValue) => {
                    setSelectedDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
         

            <FormGroup row={true}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Oficiales"
              />
              <FormControlLabel control={<Checkbox />} label="Intercambio" />
            </FormGroup>
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
