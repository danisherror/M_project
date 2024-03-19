const User=require('../models/user')
const BigPromise=require('../middlewares/bigPromise')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')


exports.signup=BigPromise(async(req,res,next)=>{

    const {name,email,password,url,collegeid,phone,semester}=req.body
    if(!email || !name || !password){
        // return next(new CustomError('Plz Send Email',400))
        return next(new Error("Name ,email and password are required"))
    }


    const user=await User.create({
        name,
        email,
        password,
        url:req.body.url1,
        collegeid,
        phone,
        semester
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

    const user=await User.findOne({email:email}).select("+password") 
    console.log(req.body)
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
exports.studentProfile=BigPromise(async(req,res)=>{
    
    const id=req.user._id
    const user=await User.findById(id);
    
    res.status(200).json({
        user
    })
})
exports.editImage=BigPromise(async(req,res)=>{
    try{
    const id=req.user._id
    const user=await User.findByIdAndUpdate(id,
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
exports.editStudentProfile=BigPromise(async(req,res)=>{
    try{
    const id=req.user._id
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
exports.applyHostel=BigPromise(async(req,res)=>{
    try{
    const id=req.user._id
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


