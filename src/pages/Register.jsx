import React, { useState } from 'react'
import Add from "../img/addAvatar.png"
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase"; //getAuth to auth
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import {Link, useNavigate} from "react-router-dom"

const Register = () => {
    const [err, setErr] = useState(false);
    const navigate = useNavigate()


    const handleSubmit = async(e) =>{
        e.preventDefault()
        // console.log(e.target[0].value);
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0]; 

        /**
         * Authentication
         */

        try{
            const res = await createUserWithEmailAndPassword(auth, email, password)
            const storageRef = ref(storage, displayName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on( 
              (error) => {
                setErr(true)
              }, 
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
                    //   console.log('File available at', downloadURL);
                    await updateProfile(res.user,{
                        displayName, //displayName:displayName,
                        photoURL: downloadURL,
                    });

                    // set Doc and database 
                    await setDoc(doc(db, "users", res.user.uid),{
                        uid: res.user.uid,
                        displayName,
                        email,
                        photoURL: downloadURL,
                    });

                    // create user chat db once register done
                    await setDoc(doc(db, "userChats", res.user.uid),{});
                    //Navigate
                    navigate("/");

                });
              }
            );
            // end 
        }
        catch(err){
            setErr(true);
            console.log(err)
        }
    };
    return(
        <div className="caf_formContainer">
            <div className="caf_fromWrapper">
                <span className="caf_logo">SABBIRSAM</span>
                <span className="caf_title">Register</span>
                <form action="" onSubmit={handleSubmit}>
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
                {err && <p>Something is worng</p> }
                <p>You do have an account?  <Link to={"/login"}>Login</Link></p>
            </div>
        </div>
    )
}

export default Register