import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import Login from "./routes/Login";
import Registro from "./routes/Registro/Registro"
export default function Links() {
    return (
      <BrowserRouter>
        <Navbar/> 
        {/* Route components would be visible only at their route */}
        <Routes>
        
          
          <Route exact path="/login" element={<Login/>}></Route>
          <Route exact path="/sign-up" element={<Registro/>}></Route>
     
        </Routes>
  
        {/* Below components would be visible always at UI */}
          {/* Top navigation Link's */}
        
       
      </BrowserRouter>
    );
  }