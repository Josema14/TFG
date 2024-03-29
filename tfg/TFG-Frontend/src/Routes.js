import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import Login from "./routes/Login/Login";
import Registro from "./routes/Registro/Registro";
import Home from "./routes/home/home";
import Header from "./components/Header";
import Shop from "./routes/shop/Shop";
import Trades from "./routes/Trades/Trades";
import Footer from "./routes/home/Footer/Footer";
import Inventory from "./routes/Inventory/Inventory";
import Profile from "./routes/Profile/Profile";
import TradeItem from "./routes/intercambio/TradeItem";
import {React, useEffect,useState} from 'react';

import TripPoints from "./routes/TripPoints/TripPoints";
import Items from "./routes/Items/Items";
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

        <Route
          exact
          path="/trades"
          element={
            //Redireccionamos si no estamos logueados
            userLogged === true ? <Trades/> : <Navigate to="/login" replace/>
          }
        />

        <Route exact path="/profile/:username" element={
          <Profile/>
        }/>

<Route
          exact
          path="/tripPoints"
          element={
            //Redireccionamos si no estamos logueados
            <TripPoints/>
          }
        />

<Route
          exact
          path="/item"
          element={
            //Redireccionamos si no estamos logueados
            <Items/>
          }
        />

<Route
          exact
          path="/tradeItem"
          element={
            //Redireccionamos si no estamos logueados
            <TradeItem/>
          }
        />
      </Routes>

      

      {/* Footers */}
      <Footer />
    </BrowserRouter>
  );
}
