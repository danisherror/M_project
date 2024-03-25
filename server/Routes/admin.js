const express=require('express')
const router=express.Router()
const {signup,signin,adminprofile,editImage,editAdminProfile,editstudentcomplaintstatus,getStudentprofiles,editStudentProfile,studentProfile,getStudentfeedback,getStudentcomplaints,createHostel,deleteHostel,getHostelDetails}=require('../controller/adminController')
const {aisLoggedIn}=require('../middlewares/admin')

router.route('/asignup').post(signup)
router.route('/asignin').post(signin)
router.route('/adminprofile').get(aisLoggedIn,adminprofile)
router.route('/aeditImage').patch(aisLoggedIn,editImage)
router.route('/editAdminProfile').patch(aisLoggedIn,editAdminProfile)

router.route('/getstudentprofiles').get(aisLoggedIn,getStudentprofiles)
router.route('/aeditstudentprofile/:id').patch(editStudentProfile)
router.route('/astudentProfile/:id').get(studentProfile)

router.route('/getstudentfeedback').get(aisLoggedIn,getStudentfeedback)
router.route('/getstudentroomissues').get(aisLoggedIn,getStudentcomplaints)
router.route('/editstudentcomplaintstatus/:id').patch(editstudentcomplaintstatus)
router.route('/createHostel').post(aisLoggedIn,createHostel)
router.route('/deleteHostel').delete(aisLoggedIn,deleteHostel)
router.route('/getHostelDetails').get(aisLoggedIn,getHostelDetails)
module.exports=router;