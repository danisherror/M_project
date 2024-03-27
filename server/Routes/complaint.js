const express=require('express')
const router=express.Router()
const {addcomplaint,getcomplaint,editcomplaint,getsinglecomplaint,editstudentcomplaintstatus,getStudentcomplaints}=require('../controller/complaintController')

const {isLoggedIn}=require('../middlewares/user')
const {aisLoggedIn}=require('../middlewares/admin')

router.route('/addcomplain').post(isLoggedIn,addcomplaint)
router.route('/getcomplain').get(isLoggedIn,getcomplaint)
router.route('/updatecomplaint/:id').put(editcomplaint)
router.route('/getsinglecomplain/:id').get(getsinglecomplaint)
router.route('/getstudentroomissues').get(aisLoggedIn,getStudentcomplaints)
router.route('/editstudentcomplaintstatus/:id').patch(editstudentcomplaintstatus)
module.exports=router;