import React from "react";
import "./Header.css";

import IconButton from "@mui/material/IconButton";
import StoreIcon from '@mui/icons-material/Store';
import Avatar from "@mui/material/Avatar";
import MailIcon from "@mui/icons-material/Mail";
import InventoryIcon from "@mui/icons-material/Inventory";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Tooltip from '@mui/material/Tooltip';
import LoginIcon from "@mui/icons-material/Login";

import { Link,useNavigate } from "react-router-dom";



const Header = (props) => {
  const navigate = useNavigate();

   function isLoggedIn(){
    //Iniciamos sesión con el email y lo guardamos en el almacenamiento local.
   let email = localStorage.getItem("email")

    if (email !== "null") return true
    else return false;

   }


  return (
    <div className="header">
      {/* Grupo izquierdo de botones */}
      <div className="header__groupButtons">
        <img className="header__logo" src="logo192.png" alt="header" />

        <Tooltip title="Productos">
        <IconButton component={Link} to="/shop" >
          <StoreIcon />
        </IconButton>
        </Tooltip>
      
      </div>

      {/* Grupo derecho de botones */}
      <div className="header__groupButtons">
        {isLoggedIn() === true ? (
          <>
           <Tooltip title="Mensajes">
            <IconButton component={Link} to="/trades">
              <MailIcon  />
            </IconButton>
            </Tooltip>
           
            <Tooltip title="Inventario">
            <IconButton component={Link} to="/inventory">
              <InventoryIcon  />
            </IconButton>
            </Tooltip>

            <IconButton onClick={() => {
             localStorage.setItem("email","null")
             localStorage.setItem("user","null")
             props.logOut()
             navigate("/")
            }} >
              <ExitToAppIcon  />
            </IconButton>
            
            <Avatar
              alt="Avatar"
              src="https://pbs.twimg.com/profile_images/1563282268486979585/mHu5iGlC_400x400.jpg"
            />

           


          </>
        ):
        (
    
         
          <div>
            <Tooltip title="Iniciar Sesión">
            <IconButton component={Link} to="/login">
              <LoginIcon />
            </IconButton>
            </Tooltip>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
