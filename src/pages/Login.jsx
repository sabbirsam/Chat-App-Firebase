import React from 'react'

const Login = () => {
  return (
    <div className="caf_formContainer">
            <div className="caf_fromWrapper">
                <span className="caf_logo">SABBIRSAM</span>
                <span className="caf_title">Login</span>
                <form action="">
                    <input type="email" placeholder='email'/>
                    <input type="password" placeholder='password'/>
                    <button>Login</button>
                </form>
                <p>You don't have an account? Sign up</p>
            </div>
        </div>
  )
}

export default Login