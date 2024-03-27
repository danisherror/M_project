const express=require('express')
const router=express.Router()
const {signup,signin,studentProfile,editImage,editStudentProfile,applyHostel,getStudentprofiles,aeditStudentProfile,astudentProfile}=require('../controller/userController')
const {isLoggedIn}=require('../middlewares/user')
const {aisLoggedIn}=require('../middlewares/admin')

router.route('/usignup').post(signup)
router.route('/usignin').post(signin)
router.route('/studentProfile').get(isLoggedIn,studentProfile)
router.route('/editImage').patch(isLoggedIn,editImage)
router.route('/editStudentProfile').patch(isLoggedIn,editStudentProfile)
router.route('/applyHostel').patch(isLoggedIn,applyHostel)


router.route('/getstudentprofiles').get(aisLoggedIn,getStudentprofiles)
router.route('/aeditstudentprofile/:id').patch(aeditStudentProfile)
router.route('/astudentProfile/:id').get(astudentProfile)


module.exports=router;