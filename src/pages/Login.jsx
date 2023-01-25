import React, { useState } from 'react'
import { auth } from '../firebase';
import {signInWithEmailAndPassword } from "firebase/auth";
import {useNavigate, Link} from "react-router-dom"

const Login = () => {
  const [err, setErr] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = async(e) =>{
        e.preventDefault()
        const email = e.target[0].value;
        const password = e.target[1].value;

        /**
         * Authentication
         */
        try{
             await signInWithEmailAndPassword(auth, email, password);
             navigate("/");
        }
        catch(err){
            setErr(true);
            console.log(err)
        }
    }

  return (
    <div className="caf_formContainer">
            <div className="caf_fromWrapper">
                <span className="caf_logo">SABBIRSAM</span>
                <span className="caf_title">Login</span>
                <form action="" onSubmit={handleSubmit}>
                    <input type="email" placeholder='email'/>
                    <input type="password" placeholder='password'/>
                    <button>Login</button>
                    {err && <span>Something went wrong</span>}
                </form>
                <p>You don't have an account? <Link to={"/register"}>Sign up</Link></p>
            </div>
        </div>
  )
}

export default Login