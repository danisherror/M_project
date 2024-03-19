const express=require('express')
const router=express.Router()
const {signup,signin,adminprofile,editImage,editAdminProfile,getStudentprofiles,editStudentProfile,studentProfile,getStudentfeedback,getStudentcomplaints}=require('../controller/adminController')
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

module.exports=router;