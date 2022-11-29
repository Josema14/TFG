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
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


const Header = (props) => {
  const navigate = useNavigate();




  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
        <a href="/">
        <img className="header__logo" src="logo192.png" alt="header" />
        </a>
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
          <a href="/tripPoints"><span >TripPoints: {localStorage.getItem("points")}</span></a>
          
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
          {/*
            <IconButton onClick={() => {
             localStorage.setItem("email","null")
             localStorage.setItem("user","null")
             props.logOut()
             navigate("/")
            }} >
              <ExitToAppIcon  />
            </IconButton>
          */}
            <IconButton onClick={handleClick}>
              {/*<a href={"/profile/" + localStorage.getItem("user")}></a>*/}
            <Avatar
              alt="Avatar"
              src={"http://localhost:5000/avatar/" + localStorage.getItem("img")}
            />
            
            </IconButton>

            <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem component={Link} to={"/profile/" + localStorage.getItem("user")} onClick={() => {handleClose();   this.forceUpdate()}}>Perfil</MenuItem>
        <MenuItem component={Link} to={"/item"} onClick={handleClose}>Publicar Experiencia</MenuItem>
        <MenuItem component={Link} to={"/"}  onClick={() => {
             localStorage.setItem("email","null")
             localStorage.setItem("user","null")
             props.logOut()
             handleClose()
             this.forceUpdate()
            }}
        >
              Cerrar sesión</MenuItem>
      </Menu>

            
           


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
