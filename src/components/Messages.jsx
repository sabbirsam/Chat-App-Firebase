import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import Message from '../components/Message'
import { ChatContext } from '../context/ChatContext';
import { db } from '../firebase';

const Messages = () => {
  const [message, setMessage] = useState([]);
  const {data} = useContext(ChatContext);

  //Fetch chat
  useEffect(()=>{
      const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc)=>{
        doc.exists() && setMessage(doc.data().messages);
      })

      return ()=>{
        unSub(); 
      }
  },[data.chatId])
  return (
    <div className='caf_messages'>
      {
        message.map(m=>(
          <Message message={m} key={m.id}/>
        ))
      }
     
      {/* <Message/>
      <Message/>
      <Message/>
      <Message/>
      <Message/>
      <Message/>
      <Message/>
      <Message/> */}
    </div>
  )
}

export default Messages
