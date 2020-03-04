import React, {useState,useEffect} from 'react';
import queryString from 'query-string';
import {Link} from 'react-router-dom';
import '../css/Chat.css';
import io from 'socket.io-client';
import {getAllUsers,getMessages} from '../functions/Chat';

import InfoBar from './InfoBar';
import Input from './Input';
import Messages from './Messages'

let socket;
const Chat =({location})=>{

const [name,setName] = useState('');
// const [room,setRoom] = useState('');
const [messages,setMessages] = useState([]);
const [oldmessages,setOldMessages] = useState([]);
const [message,setMessage] = useState('');
const [users,setUsers] = useState([]);
const [receiver, setReceiver] = useState('');
// const [receiver1, setReceiver1] = useState('');
// const [sender, setSender] = useState('');
const ENDPOINT = 'localhost:5000';

useEffect(()=>{

    getAllUsers().then(res => {
        console.log(res.data.res);
        setUsers(res.data.res);

        // setTimeout(()=>{
        //     console.log(users);
        //     },10);
        // console.log(users);
         });
const {name,sender} =queryString.parse(location.search);
setReceiver(name);
setName(sender);

socket = io(ENDPOINT);



// console.log(receiver,"sdfv",name,"nhsjdc");
const details = {
    sender1: sender,
    receiver1: name
  };
getMessages(details).then(res => {
    if (res.arr) {
            setOldMessages(res.arr);

        console.log("sdsd",res.arr);
    }
})


// setRoom(room);
socket.emit("user_connected",name);
// socket.emit('join',{name,room},(error)=>{
//     if(error) {
//         alert(error);
//       }
//     });
  }, [ENDPOINT, location.search]);



useEffect(()=>{
    socket.on('message',(message)=>{
        setMessages([...messages,message]);

    })
    socket.on("user_connected",function(username)   {
    //    window.location.reload();
        console.log("asd",username);
        

    })
    
    return()=>{
        socket.emit('disconnect');
        socket.off();
    }
},[messages]);


const sendMessage =(event)=>{
    event.preventDefault();

    if(message){
        socket.emit('sendMessage',message,name,receiver,()=>setMessage(''));
    }
}

const handleClick = (name)=>{
    // console.log("Name",name)
    socket.emit("user_connected",name)
}

    return(
        <div>
      <div className="outerContainer">
          <div className="innerContainer">
              <InfoBar room={receiver} name={name}/>
              <Messages messages={messages} name={name} oldMessages={oldmessages}/>
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            
          </div>
          
      </div>
      {/* <div>
      <ul>
          {console.log("j",users)}
        {users.map(el => (
          <li key={el.id}><button onClick={() => handleClick(el.email)}>{el.email}</button></li>
        ))}
        </ul>
      Hibghkgjkgbjkb    
  </div> */}
  </div>
    )
}

export default Chat;