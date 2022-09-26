import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./routes/Login/Login";
import Registro from "./routes/Registro/Registro"
import Home from "./routes/home/home"
import Header from "./components/Header"
import { useStateValue} from './components/StateProvider';
import Shop from "./routes/shop/Shop"

import Footer from "./routes/home/Footer/Footer"
import Inventory from "./routes/Inventory/Inventory";
export default function Links() {

  const [{user}, dispatch] = useStateValue()


    return (
      <BrowserRouter>
       {/*Renderiza la navbar*/}
       <Header login ={user}/>
     
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