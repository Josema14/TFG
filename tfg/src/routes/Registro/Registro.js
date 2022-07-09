import React, {useState} from 'react'
import "./Registro.css"
function Registro({Login, error}) {
    
 
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
                <form action='#'>
                    <h1>Registro</h1>
                    <div>
                    <input type="text" placeholder="Nombre de Usuario" />
                    <input type="email" placeholder="Email" />
			        <input type="password" placeholder="Contraseña" />
                    </div>
			        <button>Confirmar</button>
                </form>

            </div>

        </div>
        </div>

  )
}

export default Registro