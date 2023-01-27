import React, { useContext, useState } from 'react'
import Img from '../img/img.png'
import Attach from '../img/attach.png'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { v4 as uuid} from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';


const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  const handleSend = async() =>{
    if(img){
      const storageRef = ref(storage, uuid()); 
      const uploadTask = uploadBytesResumable(storageRef, img);

      // iamge  
      uploadTask.on( 
        (error) => {
          // setErr(true)
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
              await updateDoc(doc(db,"chats", data.chatId),{
                messages:arrayUnion({
                  id: uuid(),
                  text,
                  senderId:currentUser.uid,
                  date: Timestamp.now(),
                  img:downloadURL,
                })
              });

          });
        }
      );
      // end 

    }else{
      //only message
      await updateDoc(doc(db,"chats", data.chatId),{
        messages:arrayUnion({
          id: uuid(),
          text,
          senderId:currentUser.uid,
          date: Timestamp.now()
        })
      });
    }

    // Add and update last message on chat conversation image
    await updateDoc(doc(db, "userChats", currentUser.uid),{
      [data.chatId + ".lastMessage"]:{
        text
      },
      [data.chatId+".date"]:serverTimestamp()
    })
    
    setText("");
    setImg(null);

     // Add and update last message on chat conversation image other user
     await updateDoc(doc(db, "userChats", data.user.uid),{
        [data.chatId + ".lastMessage"]:{
          text
        },
        [data.chatId+".date"]:serverTimestamp()
      });

      // setText("");
      // setImg(null);

  };
  return (
    <div className='caf_input'>
      <input type="text" placeholder='Write you thought....' onChange={e => setText(e.target.value)} value={text} />
      <div className="caf_send">
        <img src={Attach} alt="" />
        <input type="file" style={{display:"none"}} id='file'  onChange={e => setImg(e.target.files[0])}/>
        <label htmlFor="file">
            <img src={Img} alt="" value={img}/>
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default Input