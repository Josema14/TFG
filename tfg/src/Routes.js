import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar"
import Login from "./routes/Login/Login";
import Registro from "./routes/Registro/Registro"
import Home from "./routes/home/home"
export default function Links() {

    return (
      <BrowserRouter>
       {/*Renderiza la navbar*/}
        <Navbar/> 
        {/* Rutas */}
        <Routes>
        
        <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/login" element={<Login/>}></Route>
          <Route exact path="/sign-up" element={<Registro/>}></Route>
     
        </Routes>
  
        {/* Footers */}
        
        
       
      </BrowserRouter>
    );
  }