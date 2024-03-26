const Leave =require("../models/leaveapplication")
const BigPromise=require('../middlewares/bigPromise')

exports.addleaveappliacation=BigPromise(async(req,res,next)=>{

    console.log("Enter the route")
    const {startDate,endDate,reason}=req.body
    
    const result=await Leave.create({
        user:req.user._id,
        startDate:startDate,
        endDate:endDate,
        reason:reason
    })
    console.log(result)
    res.status(200).json({
        result
    })
})
exports.getleaveapplication=BigPromise(async(req,res,next)=>{

    const user=req.user._id
    const result=await Leave.find({user})
    console.log("------------------------\n----------------------\n")
    console.log(result)
    res.status(200).json({
        result
    })
})
exports.editleaveapplication=BigPromise(async(req,res,next)=>{

    const id=req.params.id;
    console.log(id)

    await Leave.findByIdAndUpdate(id,req.body,{
        new:true
    });

    res.status(200).json({
        message:"SUCCESSFULLY UPDATED"
    })

})
exports.getsingleleaveapplication=BigPromise(async(req,res,next)=>{

    const user=req.params.id
    const result=await Leave.findById(user)
    console.log("------------------------\n----------------------\n")
    console.log(result)
    res.status(200).json({
        result
    })
})
exports.getallleaveapplication=BigPromise(async(req,res,next)=>{

    const result=await Leave.find()
    if(!result)
    {
        res.status(404).json({
            message:"No leave application found"
        })
    }
    res.status(200).json({
        result
    })
})