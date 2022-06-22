//import jsonwebtoken
const { sign } = require('jsonwebtoken')
const jwt = require('jsonwebtoken')

db = {
    1000: {"acno": 1000, "username":"Anu", "password":1000,"balance":5000,transaction:[]},
    1001: {"acno": 1001, "username":"Ammu", "password":1001,"balance":6000,transaction:[]},
    1002: {"acno": 1002, "username":"Anju", "password":1002,"balance":7000,transaction:[]},
  }

  var register = (username,acno,password) =>{
  
    if(acno in db){
      return {
          status : false,
          message : "Existing user!! Please Login",
          StatusCode :401
      }
    }else{
      //insert data
      db[acno] = {
        acno,
        username,
        password,
        "balance" :0,
        transaction:[]
      }
      console.log(db);      
      return {
          status :true,
          message :"Register successfully..",
          StatusCode :200
      }
    }
  }
//login
  const login = (acno,pswd) =>{

    if(acno in db){
      if(pswd == db[acno]["password"])
      {
        currentUser = db[acno]["username"]
        currentAcno = acno
        token = jwt.sign({
        currentAcno:acno

        },'secretkey123')
       
       return {
           status : true,
           message :"Login successfully",
           StatusCode :200,
           currentUser,
           currentAcno,
           token
       }

      }else{
        return {
           status : false,
           message :"Incorrect Password",
           StatusCode :401
        }
      }
    }

    else{
      return {
        status : false,
        message :"User does not exist!!",
        StatusCode :401
      }  
     }
  }

//deposit
  const deposit = (acno,password,amt) =>{
    var amount = parseInt(amt)
  
    if(acno in db){
  
      if(password == db[acno]["password"]){
        db[acno]["balance"] += amount;
        db[acno].transaction.push({
          type:"CREDIT",
          amount:amount
        })
        return{
           status : true,
           message :amount+ " deposited successfully..New balance is " +db[acno]["balance"],
           StatusCode :200
        }
            
      }
      else{
        return {
            status : false,
            message :"Incorrect Password",
            StatusCode :401
         }
      }
    }
    else{
        return {
            status : false,
            message :"User does not exist!!",
            StatusCode :401
          }  
    }
  }

  
//withdraw

const withdraw = (acno,password,amt) =>{
    var amount = parseInt(amt)
  
    if(acno in db){
  
      if(password == db[acno]["password"])
      {
        if(db[acno]["balance"]>amount)
        {
          db[acno]["balance"] -= amount;
          db[acno].transaction.push({
            type:"DEBIT",
            amount:amount
          })
          return {
                status : true,
                message :amount+ " withdraw successfully..New balance is " +db[acno]["balance"],
                StatusCode :200
             
          }
        }else
        {
          return {
            status : false,
            message :"Insufficient balance",
            StatusCode :401
         }
        }
       
      }
      else{
        return {
            status : false,
            message :"Incorrect Password",
            StatusCode :401
         }
      }
    }
    else{
        return {
            status : false,
            message :"User does not exist!!",
            StatusCode :401
         }
    }
  }

  //transaction
  const getTransactions = (acno) =>
{
    if(acno in db){
        return{
            status : true,
            StatusCode :200,
            transactions :db[acno].transaction
        }
    }
        else{
            return {
                status : false,
                message :"User does not exist!!",
                StatusCode :401
             }

        }
}

//FOR EXPORT
  module.exports = {
      register,
      login,
      deposit,
      withdraw,
      getTransactions
  }