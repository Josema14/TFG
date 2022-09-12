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

import { Link } from "react-router-dom";
import { actionTypes } from './reducer'
import { useStateValue } from './StateProvider'


const Header = (login) => {
   const [{user}, dispatch] = useStateValue()
   function isLoggedIn(login){

    console.log(login.login)
    if (login.login) return true
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
        <IconButton></IconButton>
      </div>

      {/* Grupo derecho de botones */}
      <div className="header__groupButtons">
        {isLoggedIn(login) === true ? (
          <>
           <Tooltip title="Mensajes">
            <IconButton>
              <MailIcon  />
            </IconButton>
            </Tooltip>
           
            <Tooltip title="Inventario">
            <IconButton>
              <InventoryIcon  />
            </IconButton>
            </Tooltip>

            <IconButton onClick={() => {
            dispatch({
            type: actionTypes.SET_USER,
            user: null})

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
