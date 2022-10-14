import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./routes/Login/Login";
import Registro from "./routes/Registro/Registro"
import Home from "./routes/home/home"
import Header from "./components/Header"
import Shop from "./routes/shop/Shop"

import Footer from "./routes/home/Footer/Footer"
import Inventory from "./routes/Inventory/Inventory";
import Item from "./components/items/Item"
export default function Links() {

    
   function isLoggedIn(login){
    //Iniciamos sesión con el email y lo guardamos en el almacenamiento local.
   let email = localStorage.getItem("email")
   console.log(email + "Logueado")
    if (email !== "null") return true
    else return false;

   }

    return (
      <BrowserRouter>
       {/*Renderiza la navbar*/}
       <Header/>
        <Item tipo={"Oficial"} fecha={"20/12/1000"} titulo={"Viaje por las Canarias"} imagen={"https://img.freepik.com/foto-gratis/vista-exuberante-selva-tropical-costa-rica_23-2148248823.jpg?w=1380&t=st=1664988927~exp=1664989527~hmac=7876a24bfd8498054316c0d650dfd03cc0a742ad01a9bf6ee23c0933fac1fa12"}/>
        {/* Rutas */}
        <Routes>
    
        <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/login" element={<Login/>}></Route>
          <Route exact path="/sign-up" element={<Registro/>}></Route>
          <Route exact path="/shop" element={<Shop/>}></Route>
          <Route exact path="/inventory" element={<Inventory/>}></Route>
        </Routes>
  
        {/* Footers */}
        <Footer/>
        
       
      </BrowserRouter>
    );
  }