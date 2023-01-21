import React from 'react'
import Add from "../img/addAvatar.png"

const Register = () => {
    return(
        <div className="caf_formContainer">
            <div className="caf_fromWrapper">
                <span className="caf_logo">SABBIRSAM</span>
                <span className="caf_title">Register</span>
                <form action="">
                    <input type="text" placeholder='display name'/>
                    <input type="email" placeholder='email'/>
                    <input type="password" placeholder='password'/>
                    <input style={{display:"none"}} type="file" id='caf_file' />
                        <label htmlFor="caf_file">
                            <img src={Add} alt="avatar" />
                                <span>Add an avatar</span>
                        </label>
                    <button>Sign up</button>
                </form>
                <p>You do have an account? Login</p>
            </div>
        </div>
    )
}

export default Register