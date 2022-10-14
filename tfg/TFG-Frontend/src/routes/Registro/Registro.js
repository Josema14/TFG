import React, {useState} from 'react'
import { useNavigate} from "react-router-dom";
import "../Login/Login.css"


import TextField from "@mui/material/TextField";
import KeyIcon from "@mui/icons-material/Key";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from '@mui/icons-material/Person';
import { Box } from "@mui/system";
import axios from '../../components/axios'


function Registro() {
    
    
    const [form,setForm] = useState({
        user: "",
        email: "",
        password:"",
        password2:"",
    })


    const [showError,setError] = useState({
      showEmailError: false,
      showPasswordWrong: false,
      showPasswordLengthError: false
    })


    const navigate = useNavigate();
    //Método actualizar el estado

    function updateForm(value){
        return setForm((prev) => {
            return {...prev,...value};
        });
    }


      async function onSubmit(e) {
          e.preventDefault();
          //Si la contraseña es menor de 8 no puede enviarse
          if (form.password.length <8 || form.password2.length <8){
            setError( {showEmailError: false,
              showNoPasswordError: false,
            showPasswordLengthError:true} )
            return
          }
          //Contraseñas que no son iguales
          if (form.password !== form.password2){
            setError( {showEmailError: false,
            showPasswordLengthError:false,
            showPasswordWrong:true
            } )
            return
          }
      
          //Petición post con axios
          axios.post('/register', {
            email: form.email,
            user: form.user,
            password: form.password
          }) //Registro
          .then(function (response) {
      
            console.log(response);
           
            navigate("/login");
          }) //Manejo de errores
          .catch(function (error) {
            console.log(error)
            if (error.response.status === 400){
              setError( {showEmailError: true,
                showPasswordLengthError:false,
                showPasswordWrong:false} )
            }

            
          });      
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
                    value={form.user}
                    onChange={(e) => updateForm({ user: e.target.value })}
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
                <small className="login-email-error" style={{color: "red", display: showError.showEmailError ? "block" : "none"}}>El email introducido se encuentra en uso.</small>
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

                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <KeyIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                  <TextField
                    id="input-with-sx"
                    label="Repetir Contaseña"
                    variant="standard"
                    value={form.password2}
                    onChange={(e) => updateForm({ password2: e.target.value })}
                    type="password"
                    inputProps={{ minLength : 8 }}
                    required
                    fullWidth
                  />
                </Box>
              </div>
              <small  style={{color: "red", display: showError.showPasswordWrong ? "block" : "none"}}>La contraseña no coincide</small>
              <small  style={{color: "red", display: showError.showPasswordLengthError ? "block" : "none"}}>La contraseña debe ser igual o mayor de 8 carácteres</small>
  
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

