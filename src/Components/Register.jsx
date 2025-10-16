import { useState } from "react";
import {  NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Register = () => {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const API = import.meta.env.VITE_API || 'http://localhost:3001' || 'http://localhost:2000'

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${API}/register`, {name, email, password})
        .then(result => {console.log(result)
            navigate('/login')

        })
        .catch(err=> console.log(err))

    }


    return ( 
    <> 
      <div className=" h-[100vh] jig">
     <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
    </div>
    <form onSubmit={handleSubmit}>
        <h3>Register Here</h3>

        <label>Name</label>
        <input type="text" placeholder="Name" id="name" onChange={(e) => setName(e.target.value)}/>

        <label>Username</label>
        <input type="text" placeholder="Email or Phone" id="username" onChange={(e) => setEmail(e.target.value)} />

        <label>Password</label>
        <input type="password" placeholder="Password" id="password" onChange={(e) => setPassword(e.target.value)} />

       <div className="">
          <input type="checkbox" required ></input>
         <h1>Agree to terms and conditions</h1>
        
       </div>

        <button className="button">Register</button>
        <div className="social">
         <NavLink to="/login"><h4>Login</h4></NavLink>
        </div>
    </form>
    </div> 
    </>
    );

};
export default Register;