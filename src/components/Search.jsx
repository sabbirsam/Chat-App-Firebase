import React, { useState } from 'react'
import { collection, getDocs, query, where } from "firebase/firestore"; //search query
import { db } from '../firebase';
import { async } from '@firebase/util';

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser ] = useState(null);
  const [err, setErr] = useState(false);

  const handleSearch = async() =>{
    //set Query
    const q = query(collection(db, "users"), 
              where("displayName", "==", username));

    //Execute query
    try{
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          //setUser the data
          setUser(doc.data());
        });
    }catch(err){
      setErr(true);
    }

  };
  // on key
  const handleKey = (e) => {
      e.code === "Enter" && handleSearch();
  };

  
  return (
    <div className='caf_search'>
      <div className="caf_searchForm">
        <input type="text" placeholder='Find a user' onKeyDown={handleKey} onChange={(e)=> setUsername(e.target.value)}/>
      </div>
      {err && <span>User not found.</span>}
      { user && <div className="caf_userChat">
          <img src={user.photoURL} alt="" />
          <div className="caf_userChatInfo">
            <span>{user.displayName}</span>
          </div>
      </div> }
     
    </div>
  )
}

export default Search