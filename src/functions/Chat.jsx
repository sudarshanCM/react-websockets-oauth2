import axios from 'axios';

export const getAllUsers = newUser  =>{
    return axios 
    .get('http://localhost:3007/user/getAll',{
    })
    .then(res =>{
        return res;
    })
}

export const getMessages = details  =>{
    return axios 
    .post('http://localhost:3007/user/getMessages',{
        sender:details.sender1,
        receiver:details.receiver1  
    })
    .then(res =>{
      
        return res.data
    })
    .catch(err =>{
        console.log(err);
    })
}