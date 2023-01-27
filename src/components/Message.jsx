import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext';

const Message = ({message}) => {
  
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  console.log(message)
  return (
    // owner
    <div className={`caf_message ${message.senderId === currentUser.uid && "owner"}`}>
      <div className="caf_messageInfo">
        <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} 
        alt="" />
        <span>Just now</span>
      </div>
      <div className="caf_messageContent">
        <p>{message.text}</p>
        { message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  )
}

export default Message