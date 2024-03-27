const express=require('express')
const router=express.Router()
const {signup,signin,adminprofile,editImage,editAdminProfile,createHostel,deleteHostel,getHostelDetails}=require('../controller/adminController')
const {aisLoggedIn}=require('../middlewares/admin')

router.route('/asignup').post(signup)
router.route('/asignin').post(signin)
router.route('/adminprofile').get(aisLoggedIn,adminprofile)
router.route('/aeditImage').patch(aisLoggedIn,editImage)
router.route('/editAdminProfile').patch(aisLoggedIn,editAdminProfile)


router.route('/createHostel').post(aisLoggedIn,createHostel)
router.route('/deleteHostel').delete(aisLoggedIn,deleteHostel)
router.route('/getHostelDetails').get(aisLoggedIn,getHostelDetails)
module.exports=router;