import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext()

//context provider rapper
export const AuthContextProvider = ({children})=>{
    const [currentUser, setCurrentUser] = useState({})

    //Authenticate from Firebase
    useEffect(()=>{
       const unsub = onAuthStateChanged(auth, (user)=>{
            setCurrentUser(user);
            console.log(user)
        })
        // clean memory 
        return ()=>{
            unsub();
        }
    }, []);

    return(
        //Now wrapping page
        <AuthContext.Provider  value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
};