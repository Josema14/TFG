import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import "./Login.css"

import { actionTypes } from '../../components/reducer'
import { useStateValue } from '../../components/StateProvider'
function Login({Login, error}) {

 

  const [{}, dispatch] = useStateValue()
    const [form,setForm] = useState({
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

    async function onSubmit(e){
        e.preventDefault();
        //Creamos la Query
        let findUser ={
          email:form.email,
          password: form.password
        }

      //Realizamos la petición
       const response = await fetch(`http://localhost:5000/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(findUser),
          })
          .catch(error => {
            window.alert(error);
            return;
          });
        
          if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
          }
          
          //Obtenemos el usuario y cambiamos a la página principal
          const user = await response.json();
          if(user){
            console.log(user)
            dispatch({
              type: actionTypes.SET_USER,
              user: user})
            navigate("/");
          }
          else{
            setForm({ name: "", email: "", password: "" });
          }
          
          
        }
 
    return (
        <div className='container'>
        <div className='container-register'>
            <div className='overlay-container'>
                <div className='overlay'>
                  
                    <h1>Nombre Página</h1>
                    <h1>Logo</h1>
                 
                </div>
            </div>

            <div className='form-container'>
                <form action='#' onSubmit={onSubmit}>
                    <h1>Inicio de Sesión</h1>
                    <div>
                    <input type="email" placeholder="Email" value={form.email} onChange={(e) => updateForm({email: e.target.value})} />
			        <input type="password" placeholder="Contraseña" value={form.password} onChange={(e) => updateForm({password: e.target.value})} />
                    </div>
			        <button type='submit'>Confirmar</button>
                </form>

            </div>

        </div>
        </div>

  )
}

export default Login