const Admin=require('../models/admin')
const CollegeHostelRoom = require('../models/hostel')
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
    // console.log(user)
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
    // console.log(user);
    // console.log("--------------");
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
    // console.log(user);
    res.status(200).json({

    })
    }
    catch(error)
    {
        console.log(error);
    }
})


exports.getHostelDetails=BigPromise(async(req,res,next)=>{

    const hostel_names = await CollegeHostelRoom.find().distinct('hostelName');
    const all_hostel=await CollegeHostelRoom.find()
    res.status(200).json({
        hostel_names,
        all_hostel
    })

})
exports.createHostel = BigPromise(async (req, res) => {
    try {
        // Create hostels with blocks and rooms

        const { hostelName, blocks } = req.body;

        const existingHostel = await CollegeHostelRoom.findOne({  hostelName: hostelName});
        if (existingHostel) {
            return res.status(400).json({ error: 'Hostel with the same name already exists.' });
        }

        // Create new hostel with blocks and rooms
        const hostel = {
            hostelName,
            blocks
        };


        // Iterate through each hostel
            // Iterate through each block
            for (const block of hostel.blocks) {
                // Create rooms for the block
                for (let i = 1; i <= block.numberOfRooms; i++) {
                    const roomNumber = `${block.blockName.charAt(6)}${i}`.padStart(3, '0');
                    const newRoom = new CollegeHostelRoom({
                        hostelName: hostel.hostelName,
                        block: block.blockName,
                        roomNumber: roomNumber
                        // You can add more properties here if needed
                    });
                    await newRoom.save();
                }
            }
        console.log('Hostels, blocks, and rooms created successfully.');
        res.status(200).json({ message: 'Hostels, blocks, and rooms created successfully.' });
    } catch (error) {
        console.error('Error creating hostels, blocks, and rooms:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

exports.deleteHostel = BigPromise(async (req, res) => {
    try {
        const { hostelName } = req.body;

        // Check if hostel exists
        const existingHostel = await CollegeHostelRoom.findOne({ hostelName:hostelName });
        if (!existingHostel) {
            return res.status(400).json({ error: 'Hostel does not exist.' });
        }

        // Delete the hostel
        await CollegeHostelRoom.deleteMany({ hostelName:hostelName });

        console.log(`Hostel '${hostelName}' deleted successfully.`);
        res.status(200).json({ message: `Hostel '${hostelName}' deleted successfully.` });
    } catch (error) {
        console.error('Error deleting hostel:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});