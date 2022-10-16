import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import Login from "./routes/Login/Login";
import Registro from "./routes/Registro/Registro";
import Home from "./routes/home/home";
import Header from "./components/Header";
import Shop from "./routes/shop/Shop";

import Footer from "./routes/home/Footer/Footer";
import Inventory from "./routes/Inventory/Inventory";
import Item from "./components/items/Item";

import {React, useEffect,useState} from 'react';
export default function Links() {


  const [userLogged, setUserLogged] = useState(JSON.parse(localStorage.getItem("userLogged"))
  );

  useEffect(() => {
    localStorage.setItem("userLogged", JSON.stringify(userLogged));
  }, [userLogged]);

  const logIn = () => setUserLogged(true);
  const logOut = () => setUserLogged(false);




  

 

  return (
    <BrowserRouter>
      {/*Renderiza la navbar*/}
      <Header logOut={logOut} />
      <Item
        tipo={"Oficial"}
        duracion={"22/12/00"}
        fecha={"20/12/00"}
        titulo={"Descanso en Tenerife"}
        precio={"€ 200"}
        pais={"Tenerife"}
        cantidad={"20"}
        person={"2"}
        propietario={"TripTrades"}
        imagen={
          "https://media.traveler.es/photos/62dd8b4297500f54d427e2eb/4:3/w_3407,h_2555,c_limit/GettyImages-1316911520.jpg"
        }
        descripcion={"Descubre la isla de Tenerife, la más grande de las Canarias, con uno de sus mayores atractivos, el Teide y sus fantásticas playas."}
      />

      
      {/* Rutas */}
      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route
          exact
          path="/login"
          element={
            //Redireccionamos si ya estamos logueados
            userLogged === false ? <Login logIn={logIn}/> : <Navigate to="/" replace/> }/>
     

        
        <Route
          exact
          path="/sign-up"
          element={
            //Redireccionamos si ya estamos logueados
            userLogged === false ? <Registro/> : <Navigate to="/" replace/>
          }
        />
        <Route exact path="/shop" element={<Shop />} />
        <Route
          exact
          path="/inventory"
          element={
            //Redireccionamos si no estamos logueados
            userLogged === true ? <Inventory/> : <Navigate to="/login" replace/>
          }
        />
      </Routes>

      {/* Footers */}
      <Footer />
    </BrowserRouter>
  );
}
