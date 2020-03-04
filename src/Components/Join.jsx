import React, {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import '../css/Join.css';
import {getAllUsers} from '../functions/Chat';
import io from 'socket.io-client';
import queryString from 'query-string';
import { getSecret, getHistory } from "../functions/Join";
let socket;
const ENDPOINT = 'localhost:5000';
const Join =(props)=>{
    const [name, setName] = useState('');
    const [selected, setSelected] = useState('No user selected');
    const [users,setUsers] = useState([]);
    const [secret, setSecret] = useState("");
    const [chatHistory,setHistory] = useState([]);
    let isSentByCurrentUser = false;
    
    useEffect(()=>{
        const abortController = new AbortController();
        // const {email} =queryString.parse(location.search);
        socket = io(ENDPOINT);
        
        // 
        setName(props.location.state.email);

        console.log("HDS ",name);
        

        getAllUsers().then(res => {
            console.log(res.data.res);
            setUsers(res.data.res);
    
            // setTimeout(()=>{
            //     console.log(users);
            //     },10);
            // console.log(users);
             });
             console.log(name);
             return function cleanup(){
                 
                 abortController.abort();

             }
            
    },[selected]);

    const handleSubmit = (evt) => {
        evt.preventDefault();
       

        const user = {
            secret:secret,
            
          };
        //   console.log("sad",user.secret);
      
          getSecret(user).then(res => {
            if (res.res.email) {
                // console.log("abcd",res.res.email);
                setSelected(res.res.email)
            //    alert(res);
            isSentByCurrentUser = true;
             
            }
          })

    }
    
    // console.log("Y",history)
    useEffect(()=>{
        const history ={
            name:props.location.state.email
        };
    getHistory(history).then(res=>{
        console.log("sa",res);
        setHistory(res);
    });
},[])
    // const handleClick = (name)=>{
    //     // console.log("Name",name)
    //     socket.emit("user_connected",name)
    // }
    return(
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Enter Secret Key</h1>

                {/* <div>
                    <input placeholder="Name" className="joinInput" type="text" onChange={(event)=>setName(event.target.value)}/>    
                </div> */}
<div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={handleSubmit}>
              <div className="form-group">
                
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  placeholder="Enter secret key"
                  value={secret}
                  onChange={e => setSecret(e.target.value)}
                />
              </div>  <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
             Search
              </button>

              </form>
          </div>
        </div>
                <div>
                <div>
      <ul>
          {isSentByCurrentUser?(
              <p>No user Selected</p>
          ):
          
          
          
          (  <li>
            <Link onClick={event=>(!name)? event.preventDefault():null} to={`/chat?name=${selected}&sender=${name}`}>
          <button className="button mt-20" type="submit">{selected}</button>
                  </Link>
            </li>)
          
          
          }
        
          {/* {console.log("j",users[0])} */}
        {/* {users.map(el => (
            
          <li key={el.id}>
   <Link onClick={event=>(!name)? event.preventDefault():null} to={`/chat?name=${el.email}&sender=${name}`}>
        <button className="button mt-20" type="submit">{el.email}</button>
                </Link>
              

          </li>
        ))} */}
        </ul>
        
  </div>
                    {/* <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event)=>setRoom(event.target.value)}/>     */}
                </div>
                {/* <Link onClick={event=>(!name || !room)? event.preventDefault():null} to={`/chat?name=${name}&room=${room}`}>
                    <button className="button mt-20" type="submit">Join</button>
                </Link> */}

<div> <h1 className="heading">Chat history</h1>
{chatHistory?(
    <ul>
  {chatHistory.map(el => (
            
    <li key={el.id}>
<Link onClick={event=>(!name)? event.preventDefault():null} to={`/chat?name=${el}&sender=${name}`}>
  <button className="button mt-20" type="submit">{el}</button>
          </Link>
        

    </li>

  ))} 
  
  </ul>
):
(<div>No Chat History</div>)
}

</div>
            </div>

        </div>
    )
}

export default Join;