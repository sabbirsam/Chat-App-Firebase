import React, { useContext } from 'react'
import {signOut} from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  //retrive all info
  const {currentUser} = useContext(AuthContext)
  console.log(currentUser)
  return (
    <div className='caf_navbar'>
      <span className="caf_logo">
        SABBIR SAM
      </span>
      <div className="caf_user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={()=> signOut(auth) }>logout</button>
      </div>
    </div>
  )
}

export default Navbar