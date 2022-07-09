import React, {useState} from 'react'
import "./Login.css"
function Login({Login, error}) {
    const [details, setDetails] = useState({name:"", email:"",password:""});
 
    const submitHandler = e => {
        e.preventDefault();

        Login(details);
    }
 
    return (
        <div id="card">
        <div id="card-content">
            <div id="card-title">
            <h2>Iniciar Sesión</h2>
            <div class="underline-title"></div>
            </div>
        <form onSubmit={submitHandler} className="form">
           
               
              
                   
                   
                    
               
                    <label htmlFor='email' style={{paddingTop:"13px"}}>Email:</label>
                    <input type='email' name='email' className="form-content" onChange={e => setDetails({...details, email: e.target.value})} value={details.email}/>
                    <div class="form-border"></div>
              
                    <label htmlFor='password' style={{paddingTop:"13px"}}>Contraseña:</label>
                    <input type='password' name='password' className="form-content" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
                    <div class="form-border"></div>

                    <a href="#">
          <legend id="forgot-pass">Recordar contraseña</legend>
        </a>
                <input id="submit-btn" type="submit" name="submit" value="Iniciar Sesión" />
            <a href="sign-up"  id="signup">¿No tienes una cuenta?</a>
       
        </form>
        
        </div>
    </div>
  )
}

export default Login