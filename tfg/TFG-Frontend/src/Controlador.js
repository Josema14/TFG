
import axios from './components/axios'


export function signUp(email,user,password){
    
        //Petición post con axios
    
        return  axios.post('/register', {
          email: email,
          user: user,
          password: password
        })
    }


export function login(email,password){


     //Petición post con axios
     return axios.post('/login', {
        email: email,
        password: password
      }) 

}



