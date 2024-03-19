const mongoose =require('mongoose')

const complaintSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    description:{
        type:String
    }
})

module.exports=mongoose.model('Complaint',complaintSchema)