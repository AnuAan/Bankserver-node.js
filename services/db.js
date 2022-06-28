//db connection

//import mongoose
const mongoose = require('mongoose')

//connection string
mongoose.connect('mongodb://localhost:27017/bankApp',{
    useNewUrlParser:true
})
const User = mongoose.model('User',{
     acno: Number,
     usernmae:String, 
     password:String,
     balance:Number,
     transaction:[]
})

module.exports={
    User
}