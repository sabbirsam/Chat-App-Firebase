import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase';

const Chats = () => {
  const [chats, setChats] = useState([])
  const {currentUser} = useContext(AuthContext);

  // fetch all chats from userChat 
  useEffect(()=>{
   //
    const getChats = () =>{
      //realtime chagnes fetch
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
            // console.log("Current data: ", doc.data());
            setChats(doc.data());
        });

        // cleanup 
        return()=>{
          unsub();
        };
    }

    //If we have currentUser.uid then call this function else it may generate error as first time we dont have any id
    currentUser.uid && getChats();

  },[currentUser.uid])

// console.log(chats);
console.log(Object.entries(chats));

  return (
    <div className='caf_chats'>
      {Object.entries(chats)?.map(chat=>(
        <div className="caf_userChat" key={chat[0]}>
            <img src={chat[1].userInfo.photoURL} alt="" />
            <div className="caf_userChatInfo">
              <span>{chat[1].userInfo.displayName}</span>
              <p>{chat[1].userInfo.lastMessage?.text }</p>
            </div>
        </div>
      ))}
    </div>
  )
}

export default Chats