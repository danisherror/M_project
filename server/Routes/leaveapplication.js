const express=require('express')
const router=express.Router()
const {isLoggedIn}=require('../middlewares/user')
const {aisLoggedIn}=require('../middlewares/admin')
const {addleaveappliacation,getleaveapplication,editleaveapplication,getsingleleaveapplication,getallleaveapplication}=require("../controller/leaveApplicationController")


router.route('/addleaveappliacation').post(isLoggedIn,addleaveappliacation)
router.route('/getleaveapplication').get(isLoggedIn,getleaveapplication)
router.route('/updateleaveappliacation/:id').patch(editleaveapplication)
router.route('/getsingleleaveapplication/:id').get(getsingleleaveapplication)
router.route('/getallstudentleaveapplication').get(aisLoggedIn,getallleaveapplication)
module.exports=router;