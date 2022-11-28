import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

import TextField from "@mui/material/TextField";
import KeyIcon from "@mui/icons-material/Key";
import EmailIcon from "@mui/icons-material/Email";
import { Box } from "@mui/system";

import {login} from '../../Controlador'
function Login(props) {

  //Navegador para volver a la página principal
  const navigate = useNavigate();
  //Estado del usuario para poder realizar la petición
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  //Estado para los errores
  const [showError,setError] = useState({
    showEmailError: false,
    showNoPasswordError: false,
    showPasswordLengthError: false
  })
  

  //Método actualizar el estado

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  //Función para enviar los datos al servidor
  async function onSubmit(e) {
    e.preventDefault();
    //Si la contraseña es menor de 8 no puede enviarse
    if (form.password.length <8){
      setError( {showEmailError: false,
        showNoPasswordError: false,
      showPasswordLengthError:true} )
      return
    }

    login(form.email, form.password).then ((response) => {

      //Obtenemos el usuario 
      const user = response.data;
      
      //Preparamos el login
      localStorage.setItem("email", user.email)
      localStorage.setItem("user", user.user)
      localStorage.setItem("img",user.image)
      localStorage.setItem("points",user.points)
      props.logIn()
      //Nos movemos a la página principal
      navigate("/");
    }).catch( (error) => {

      //Códigos de error
      console.log(error)
      if (error.response.status === 404){
        setError( {showEmailError: true,
        showNoPasswordError: false,
        showPasswordLengthError:false} )
      }
      else if (error.response.status === 400){
        setError( {showEmailError: false,
        showNoPasswordError: true,
        showPasswordLengthError:false} )
      }

    })
   
  }

  return (
    //Componente
    
    <div className="login-app">
      
      {
        
          /*Contenedor*/
        
      }
      <div className="container-login">
        {
          
            /*Parte izquierda*/
          
        }
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
        
          {
            /*Parte derecha*/
          }
        
        <div className="form-container">
          
            {
              /*Formulario*/
            }
          
          <form action="#" onSubmit={onSubmit} className="login-form">
            <h1 className="container-login-h1">
              Inicio de Sesión <hr className="login-text-hr" />
            </h1>

            {/*Inputs MaterialUI*/}
            <div className="form-login-container">
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
              <small className="login-email-error" style={{color: "red", display: showError.showEmailError ? "block" : "none"}}>El email no se encuentra registrado</small>

              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <KeyIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                <TextField
                  id="input-with-sx"
                  label="Contraseña"
                  variant="standard"
                  value={form.password}
                  onChange={(e) => updateForm({ password: e.target.value })}
                  type="password"
                  inputProps={{ minLength: 8 }}
                  required
                  fullWidth
                />
              </Box>
              <small  style={{color: "red", display: showError.showNoPasswordError ? "block" : "none"}}>La contraseña no coincide</small>
              <small  style={{color: "red", display: showError.showPasswordLengthError ? "block" : "none"}}>La contraseña debe ser igual o mayor de 8 carácteres</small>
            </div>
           

            <div>
              <button type="submit" className="login-button">
                Confirmar
              </button>
              <p className="login-p">
                ¿No estás registrado? Registrate  <a href="http://localhost:3000/sign-up">aquí</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
