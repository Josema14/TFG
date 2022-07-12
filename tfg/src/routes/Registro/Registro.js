import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import "./Registro.css"

function Registro({Login, error}) {

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

        await fetch("http://localhost:5000/record/add", {
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
                    <h1>Registro</h1>
                    <div>
                    <input type="text" placeholder="Nombre de Usuario" value={form.name} onChange={(e) => updateForm({name: e.target.value})} />
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

export default Registro