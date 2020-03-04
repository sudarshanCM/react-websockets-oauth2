import axios from 'axios';


export const getSecret = newUser  =>{
    return axios 
    .post('http://localhost:3007/user/secret',{
        
        secret:newUser.secret
    })
    .then(res =>{
        // console.log("Hey",res.data);
    //    alert(res.data);
        return res.data
    })
    .catch(err =>{
        console.log(err);
    })
}

export const getHistory = newUser  =>{
    return axios 
    .post('http://localhost:3007/user/history',{
        
        name:newUser.name
    })
    .then(res =>{
        // console.log("Hey",res.data);
    //    alert(res.data);
        return res.data
    })
    .catch(err =>{
        console.log(err);
    })
}