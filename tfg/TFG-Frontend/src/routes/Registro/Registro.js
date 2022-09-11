import React, {useState} from 'react'
import { useNavigate, useLocation} from "react-router-dom";
import "./Registro.css"

function Registro({Login, error}) {
    
    const {state} = useLocation();
    if(state!=null){
    const { id, name} = state; // Read values passed on state
    console.log(id,name)
    }
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
          
          navigate("/");
        }
 
    return (
        <div className='register-body'>
        <div className='register-container'>
        <div className='register-container-card'>
            <div className='overlay-container'>
                <div className='overlay'>
                  
                    <h1>Nombre Página</h1>
                    <h1>Logo</h1>
                 
                </div>
            </div>

            <div className='register-form-container'>
                <form action='#' onSubmit={onSubmit}>
                    <h1>Registro</h1>
                    <div>
                    <input type="text" required placeholder="Nombre de Usuario" value={form.name} onChange={(e) => updateForm({name: e.target.value})} />
                    <input type="email" required placeholder="Email" value={form.email} onChange={(e) => updateForm({email: e.target.value})} />
			        <input type="password" required placeholder="Contraseña" value={form.password} onChange={(e) => updateForm({password: e.target.value})} />
                    </div>
			        <button type='submit'>Confirmar</button>
                </form>

            </div>

        </div>
        </div>
        </div>
  )
}

export default Registro