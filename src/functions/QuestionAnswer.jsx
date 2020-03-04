import axios from 'axios';

export const getquestion = newUser  =>{
    return axios 
    .get('http://localhost:3007/user/question',{
    })
    .then(res =>{
        return res;
    })
}

export const score = newUser  =>{
    return axios 
    .post('http://localhost:3007/user/score',{
        email:newUser.email,
        score:newUser.score
    })
    .then(res =>{
      
        return res.data
    })
    .catch(err =>{
        console.log(err);
    })
}