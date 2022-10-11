import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

import TextField from "@mui/material/TextField";
import KeyIcon from "@mui/icons-material/Key";
import EmailIcon from "@mui/icons-material/Email";
import { Box } from "@mui/system";

import { actionTypes } from "../../components/reducer";
import { useStateValue } from "../../components/StateProvider";

function Login() {
  //Dispatch para mantener el usuario
  const [{}, dispatch] = useStateValue();

  //Navegador para volver a la página principal
  const navigate = useNavigate();
  //Estado del usuario para poder realizar la petición
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  //Método actualizar el estado

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  //Función para enviar los datos al servidor
  async function onSubmit(e) {
    e.preventDefault();
    //Creamos la Query
    let findUser = {
      email: form.email,
      password: form.password,
    };

    //Realizamos la petición
    const response = await fetch(`http://localhost:5000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(findUser),
    }).catch((error) => {
      //Manejo de errores
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    });

    //Obtenemos el usuario y cambiamos a la página principal
    const user = await response.json();
    console.log(user);
    if (user.email) {
      //Añadimos el usuario al dispatch
      console.log(user);
      dispatch({
        type: actionTypes.SET_USER,
        user: user,
      });

      localStorage.setItem("email",user.email)
      navigate("/");
    } else {
      //Si no hay usuario reiniciamos el formulario
      //Añadido: Mostrar error de que no existe el usuario/contraseña equivocada

      setForm({ name: "", email: "", password: "" });
    }
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
            </div>

            <div>
              <button type="submit" className="login-button">
                Confirmar
              </button>
              <p className="login-p">
                ¿No estás registrado? Registrate{" "}
                <a href="http://localhost:3000/sign-up">aquí</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
