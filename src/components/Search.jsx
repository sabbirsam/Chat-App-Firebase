import React, { useContext, useState } from 'react'
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore"; //search query
import { db } from '../firebase';
import { async } from '@firebase/util';
import {AuthContext} from "../context/AuthContext"

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser ] = useState(null);
  const [err, setErr] = useState(false);
  //current user get
  const {currentUser} = useContext(AuthContext);

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

  console.log(err);

  //Add selected conversation in the firebase and fetch all data
  const handleSelect = async() =>{
    //Group checking are those exist or not= > chats in firestore but if not exist then create another new
    //so chats -> messages array and inside here two user message store
    //combine chat Id to create a unique id
    const combineId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;

    try{
        const res = await getDoc(doc (db,"chats",combineId));
        //firebase method -> .exists()
        if( !res.exists()){
          //if not exist then create a new chat and {} empty as initially we dont have any message
          await setDoc(doc( db, "chats", combineId ),{ messages: [] });

          //create user chat => userChats:{ I seatch and click: example -> janeId:{ displayName, image, id}, lastMessage: "", date:}
          //https://firebase.google.com/docs/firestore/manage-data/add-data  Update fields in nested objects documents
          await updateDoc(doc(db, "userChats", currentUser.uid),{

            [combineId+".userInfo"]:{
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL
            },
            [combineId+".date"]: serverTimestamp()
            // no need to add last message as it will comming from input what we send last
          });

          // Other User 
          await updateDoc(doc(db, "userChats", user.uid),{

            [combineId+".userInfo"]:{
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL
            },
            [combineId+".date"]: serverTimestamp()
            // no need to add last message as it will comming from input what we send last
          });


        }

    }catch(err){

    }
    //after search remove
    setUser(null);
    //remove text from filed
    setUsername("")
  };

  return (
    <div className='caf_search'>
      <div className="caf_searchForm">
        <input type="text" placeholder='Find a user' value={username} onKeyDown={handleKey} onChange={(e)=> setUsername(e.target.value)}/>
      </div>
      {err && <span>User not found.</span>}
      { user && <div className="caf_userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="caf_userChatInfo">
            <span>{user.displayName}</span>
          </div>
      </div> }
     
    </div>
  )
}

export default Search