const Admin=require('../models/admin')
const User=require('../models/user')
const Feedback= require('../models/feedback')
const Complaint=require('../models/complaint')
const BigPromise=require('../middlewares/bigPromise')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')


exports.signup=BigPromise(async(req,res,next)=>{

    const {name,email,password,url,collegeid,phone}=req.body
    if(!email || !name || !password){
        // return next(new CustomError('Plz Send Email',400))
        return next(new Error("Name ,email and password are required"))
    }


    const user=await Admin.create({
        name,
        email,
        password,
        url:req.body.url1,
        collegeid,
        phone,
    })
    console.log(user)
    //method to generte a cookie with the token generated with the expiry date ...........................
   res.status(200).json({
        name,
        email,
        token:user.getJwtToken()
   })
    
})

exports.signin=BigPromise(async (req,res)=>{

    const {email,password}=req.body

    const user=await Admin.findOne({email:email}).select("+password") 
    if(!user)
    {
        return res.status(401).json({
            message:"User does not exsist Plz Signup"
        })
    }

    if(!await  bcrypt.compare(password,user.password)){
       
        return res.status(401).json({
            message:"Password does not match "
        })
    }
    const token=user.getJwtToken()
    res.status(200).json({
        user,
        token
    })
    
})
exports.adminprofile=BigPromise(async(req,res)=>{
    
    const id=req.user._id
    const user=await Admin.findById(id);
    
    res.status(200).json({
        user
    })
})
exports.editImage=BigPromise(async(req,res)=>{
    try{
    const id=req.user._id
    const user=await Admin.findByIdAndUpdate(id,
        {
          url:req.body.url
        });
    console.log(user);
    console.log("--------------");
    res.status(200).json({
        
    })
    }
    catch(error)
    {
        console.log(error);
    }
})
exports.editAdminProfile=BigPromise(async(req,res)=>{
    try{
    const id=req.user._id
    const user=await Admin.findByIdAndUpdate(id,req.body,{
        new:true
    });
    console.log(user);
    res.status(200).json({
        
    })
    }
    catch(error)
    {
        console.log(error);
    }
})
exports.getStudentprofiles=BigPromise(async(req,res)=>{
    
    const id=req.user._id
    const user=await User.find()
    
    res.status(200).json({
        user
    })
})
exports.editStudentProfile=BigPromise(async(req,res)=>{
    try{
    const id=req.params.id
    const user=await User.findByIdAndUpdate(id,req.body,{
        new:true
    });
    console.log(user);
    res.status(200).json({
        
    })
    }
    catch(error)
    {
        console.log(error);
    }
})
exports.studentProfile=BigPromise(async(req,res)=>{
    
    const id=req.params.id;
    const user=await User.findById(id);
    console.log("------------------------------")
    console.log(user)
    res.status(200).json({
        user
    })
})
exports.getStudentfeedback=BigPromise(async(req,res,next)=>{

    const result=await Feedback.find()
    res.status(200).json({
        result
    })
})
exports.getStudentcomplaints=BigPromise(async(req,res,next)=>{

    const result=await Complaint.find()
    res.status(200).json({
        result
    })
})

