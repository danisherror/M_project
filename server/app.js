const express=require('express')
const app=express()
require('dotenv').config()
// const morgan = require('morgan')
// const cookieParser=require('cookie-parser')
// const fileUpload=require('express-fileupload')

//reguglar miidelware
app.use(express.json())                             // To handle the json
app.use(express.urlencoded({extended:true}))        //to handle something comming in the body

const user=require('./Routes/user')
const feedback=require('./Routes/feedback')
const complaint=require('./Routes/complaint')
const admin=require('./Routes/admin')
//test route
app.use("/api/v1",user)
app.use("/api/v1",feedback)
app.use("/api/v1",complaint)
app.use("/api/v1",admin)

app.get('/test',(req,res)=>{
    res.send("SUCCESS")
})


//export app.js
module.exports=app;