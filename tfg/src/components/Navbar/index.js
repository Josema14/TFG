import React from 'react'
import {Nav, NavLink,Bars,NavMenu,NavBtn,NavBtnLink} from './NavbarElements';

const Navbar = () => {
  return (
    <>
       <Nav>
         <NavLink to="/">
            <h1>Logo</h1>
         </NavLink>
         <Bars />
         <NavMenu>
            <NavLink to="/products">
                Productos
            </NavLink>
            <NavLink to="/services" >
                Servicios
            </NavLink>
            <NavLink to="/contact-us" >
                Contáctanos
            </NavLink>
            <NavLink to="/sign-up" >
                Registrarse
            </NavLink>
         </NavMenu>
         <NavBtn>
            <NavBtnLink to='/login'>Iniciar Sesión</NavBtnLink>
         </NavBtn>
       </Nav>
    </>
  )
}

export default Navbar