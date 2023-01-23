import React from 'react'

const Message = () => {
  return (
    // owner
    <div className='caf_message'>
      <div className="caf_messageInfo">
        <img src="https://images.pexels.com/photos/3968442/pexels-photo-3968442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
        <span>Just now</span>
      </div>
      <div className="caf_messageContent">
        <p>Hello there! How are you today?</p>
        <img src="https://images.pexels.com/photos/3968442/pexels-photo-3968442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
      </div>
    </div>
  )
}

export default Message