import React, {useState} from 'react'
import "./Registro.css"
function Registro({Login, error}) {
    
 
    return (
        <div id="card">
        <div id="card-content">
            <div id="card-title">
            <h2>Registro</h2>
            <div class="underline-title"></div>
            </div>
        <form  className="form">
           
               
              
                   
                   
                    
               
                    <label htmlFor='email' style={{paddingTop:"13px"}}>Email:</label>
                    <input type='email' name='email' className="form-content" />
                    <div class="form-border"></div>
              
                    <label htmlFor='password' style={{paddingTop:"13px"}}>Contraseña:</label>
                    <input type='password' name='password' className="form-content" />
                    <div class="form-border"></div>

                    <label htmlFor='password2' style={{paddingTop:"13px"}}>Repetir contraseña:</label>
                    <input type='password' name='password2' className="form-content" />
                    <div class="form-border"></div>

                <input id="submit-btn" type="submit" name="submit" value="Confirmar" />
            <a href="login" id="signup">¿Ya tienes una cuenta?</a>
       
        </form>
        
        </div>
    </div>
  )
}

export default Registro