import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./routes/Login/Login";
import Registro from "./routes/Registro/Registro"
import Home from "./routes/home/home"
import Header from "./components/Header"
import { useStateValue} from './components/StateProvider';
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
     
        </Routes>
  
        {/* Footers */}
        
        
       
      </BrowserRouter>
    );
  }