const model = require('../models');
const bcrypt = require('bcrypt');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;



class UserController{



    async register(data){
        return new Promise((resolve, reject) => {
            const userData = {
                name:data.name,
                email:data.email,
                password:data.password
            }

            model.Register.findOne({
         
                where:{
                    email:data.email
                }  
             })
                .then(user =>{
                    if(!user){
                       
                        bcrypt.hash(data.password,10,(err,hash)=>{
                            userData.password = hash
                            model.Register.create(userData)
                            .then(user =>{
                                // console.log("us",user.dataValues.id);
                                resolve({code : 200,message:"User Resgistered"});
                                // resolve({code : 200, message:"Register Successful"});
                            })
                            .catch(err =>{
                                reject({error:err,message:"Error"});
                            })
                        })
                    }
                    else{
                        resolve({code : 200,message:"User already exist"});
                    }
        
        
                })
                .catch(err =>{
                    reject({error:err,message:"Error"});
                })
        
                
                })//end of promise
        
        
    
    }//register

    async login(data){
        return new Promise((resolve, reject) => {
            model.Register.findOne({
                where:{
                    email:data.email
                }
            }).then(user =>{
                if(user){
                    // console.log("aa",data.password,user.password)   
                    if(bcrypt.compareSync(data.password,user.password)){
                        resolve({code:200,message:'Login Success'})
                    }
                }
                    else{
                        resolve({code:400,message:'User does not exist'})
                    
                }
            }).catch(err => {
                reject({code:400,message:err})
            })
        })
    }

    async question(){
        return new Promise((resolve, reject) => {
            model.QuestionAnswer.findAll({order: [
                [Sequelize.literal('RAND()')]
              ], limit: 10})
            .then(res=>{
                // console.log("Hey",res);
                resolve({ res });
            })
        })

    }


    async score(data){
        return new Promise((resolve, reject) => {
            model.Scores.create(data)
            .then(res=>{
                // console.log("Hey",res);
                resolve({code:200,message:'Score Registered'})
            }).catch(err => {
                reject({code:400,message:err})
            })
        })

    }

    async secret(data){
        return new Promise((resolve, reject) => {
            model.secret.findOne({where:{secretKey:data.secret}})
            .then(res=>{
                // console.log("Hey",res);
                resolve({res})
            }).catch(err => {
                reject({code:400,message:err})
            })
        })

    }


    async history(data){
        return new Promise((resolve, reject) => {
            model.messages.findAll({where:Sequelize.or({sender:data.name},{receiver:data.name})})
            .then(res=>{
                console.log("Hey",res);
                var arr = [];

                for(var i=0;i < res.length;i++){
                    console.log("s",res[i].dataValues)
                    if(res[i].dataValues.sender!=data.name){
                    arr.push(res[i].dataValues.sender);}
                    else{
                        arr.push(res[i].dataValues.receiver);
                    }
                }
                console.log("final",arr)
                const uniquearr = new Set(arr)
                console.log("uniquefinal",uniquearr)
                arr =[...uniquearr];
                resolve({arr})
            }).catch(err => {
                reject({code:400,message:err})
            })
        })

    }


    async getMessages(data){
        return new Promise((resolve, reject) => {
            model.messages.findAll({where:Sequelize.or(Sequelize.and({sender:data.receiver},{receiver:data.sender}),Sequelize.and({sender:data.sender},{receiver:data.receiver})), order: [
               
                ['createdAt', 'ASC'],
            ],})
            .then(res=>{
                console.log("Hey",res[0].dataValues.message,res.length);
                var arr = [];

                for(var i=0;i < res.length;i++){
                    console.log("s",res[i].dataValues)
                    var obj = {
                       user: res[i].dataValues.sender,
                       text: res[i].dataValues.message
                    }
                    arr.push(obj);
                }
                // console.log("K",arr);
                resolve({arr})
            }).catch(err => {
                reject({code:400,message:err})
            })
        })

    }



    async getAll(){
        return new Promise((resolve, reject) => {
            model.Register.findAll()
            .then(res=>{
                // console.log("Hey",res);
                resolve({ res });
            })
        })

    }



}

module.exports = db => {
    return new UserController(db);
};