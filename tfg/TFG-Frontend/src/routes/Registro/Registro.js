import React, {useState} from 'react'
import { useNavigate} from "react-router-dom";
import "../Login/Login.css"


import TextField from "@mui/material/TextField";
import KeyIcon from "@mui/icons-material/Key";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from '@mui/icons-material/Person';
import { Box } from "@mui/system";


function Registro() {
    
    
    const [form,setForm] = useState({
        name: "",
        email: "",
        password:"",
    })
    const navigate = useNavigate();
    //Método actualizar el estado

    function updateForm(value){
        return setForm((prev) => {
            return {...prev,...value};
        });
    }

    //Función para crear un usuario
    async function onSubmit(e){
        e.preventDefault();
        
        const newUser = {...form};
        //Realizamos el post para añadir un usuario
        await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          })
          .catch(error => {
            window.alert(error);
            return;
          });
        
          setForm({ name: "", email: "", password: "" });
          
          navigate("/login");
        }
 
    return (
        <div className="login-app">
        <div className="container-login">
          <div className="login-overlay-container">
            <div className="container-login-text">
              <h2 className="container-login-h2">
                <span className="container-login-span">TripTrades</span>
              </h2>
              
              <p className="container-login-p">
                Empresa pionera en el intercambio de viajes online
              </p>
            </div>
          </div>
  
          <div className="form-container">
            <form action="#" onSubmit={onSubmit} className="login-form">
              <h1 className="container-login-h1">
                Registro de usuario <hr className="login-text-hr" />
              </h1>
  
              {/*Inputs MaterialUI*/}
              <div className="form-login-container">
                
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <PersonIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                  <TextField
                    id="input-with-sx"
                    label="Nombre de usuario"
                    variant="standard"
                    value={form.name}
                    onChange={(e) => updateForm({ name: e.target.value })}
                    required
                    fullWidth
                    
                  />
                </Box>


                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <EmailIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                  <TextField
                    id="input-with-sx"
                    label="Email"
                    variant="standard"
                    value={form.email}
                    onChange={(e) => updateForm({ email: e.target.value })}
                    type="email"
                    required
                    fullWidth
                    
                  />
                </Box>
  
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <KeyIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                  <TextField
                    id="input-with-sx"
                    label="Contraseña"
                    variant="standard"
                    value={form.password}
                    onChange={(e) => updateForm({ password: e.target.value })}
                    type="password"
                    inputProps={{ minLength : 8 }}
                    required
                    fullWidth
                  />
                </Box>
              </div>
              
  
              <div>
              <button type="submit" className="login-button">
                Confirmar
              </button>
              <p className='login-p'>¿Ya estás registrado? Inicia sesión <a href="http://localhost:3000/login">aquí</a></p>
            </div>
            </form>
  
            
          </div>
        </div>
      </div>
  )
}

export default Registro

