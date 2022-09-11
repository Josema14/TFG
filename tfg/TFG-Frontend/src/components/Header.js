import React from "react";
import "./Header.css";

import IconButton from "@mui/material/IconButton";

import Avatar from "@mui/material/Avatar";
import MailIcon from "@mui/icons-material/Mail";
import InventoryIcon from "@mui/icons-material/Inventory";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

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

        <IconButton></IconButton>

        <IconButton></IconButton>
      </div>

      {/* Grupo derecho de botones */}
      <div className="header__groupButtons">
        {isLoggedIn(login) === true ? (
          <>
            <IconButton>
              <MailIcon  />
            </IconButton>
            <IconButton>
              <InventoryIcon  />
            </IconButton>

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
            <IconButton component={Link} to="/login">
              <LoginIcon />
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
