const express = require('express')
const res = require('express/lib/response')
const jwt = require('jsonwebtoken')


//.............import services
const dataservice = require('./services/data.service')

//server app create using express
const app = express()

//parse JSON data
app.use(express.json())



//application specific middlware
const AppMiddleare = (req,res,next)=>{
next()

}
//use middleware in app
app.use(AppMiddleare)

//bank server
const jwtMiddleware = (req,res,next)=>{
    //fetch token
    try{

        token = req.headers['x-access-token']
        //verify token
       const data = jwt.verify(token,'secretkey123')
       next()
    }
    catch{
        res.status(401).json({
            status:false,
            StatusCode:401,
            message:'Please Login'
        })
    }
   
}




// to get data
app.get('/',(req,res) =>{
res.send("Get request")
})


//registar API
app.post('/register',(req,res) =>{
    const result = dataservice.register(req.body.username,req.body.acno,req.body.password)
    res.status(result.StatusCode).json(result)

})

//login API
app.post('/login',(req,res) =>{
    const result = dataservice.login(req.body.acno,req.body.pswd)
    res.status(result.StatusCode).json(result)

})

//deposit API
app.post('/deposit',jwtMiddleware,(req,res) =>{
    const result = dataservice.deposit(req.body.acno,req.body.password,req.body.amt)
    res.status(result.StatusCode).json(result)

})

//withdraw
app.post('/withdraw',jwtMiddleware,(req,res) =>{
    const result = dataservice.withdraw(req.body.acno,req.body.password,req.body.amt)
    res.status(result.StatusCode).json(result)

})


//transactions
app.post('/transaction',jwtMiddleware,(req,res) =>{
    const result = dataservice.getTransactions(req.body.acno)
    res.status(result.StatusCode).json(result)

})










//to create data
app.post('/',(req,res) =>{
    res.send("post request")
    })

//to modify entire data
 app.put('/',(req,res) =>{
        res.send("put request")
        })

//to modify partially
 app.patch('/',(req,res) =>{
            res.send("patch request")
            })

//to delete data
app.delete('/',(req,res) =>{
    res.send("delete request")
    })

app.listen(3000, () =>{
    console.log("server started..at 3000");
})