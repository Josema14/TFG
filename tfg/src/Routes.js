import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import Login from "./routes/Login";
export default function Links() {
    return (
      <BrowserRouter>
        <Navbar/> 
        {/* Route components would be visible only at their route */}
        <Routes>
        {/*
          <Route exact path="/about" component={About}></Route>
          <Route exact path="/services" component={Services}></Route>*/
          <Route exact path="/login" element={<Login/>}></Route>
     }
        </Routes>
  
        {/* Below components would be visible always at UI */}
          {/* Top navigation Link's */}
        
       
      </BrowserRouter>
    );
  }