const express=require('express')
const router=express.Router()
const {addfeedback,test,getfeedback,editfeedback,getsinglefeedback}=require('../controller/feedbackController')

const {isLoggedIn}=require('../middlewares/user')

router.route('/addfeedback').post(isLoggedIn,addfeedback)
router.route('/getfeedback').get(isLoggedIn,getfeedback)
router.route('/getsinglefeedback/:id').get(getsinglefeedback)
router.route('/updatefeedback/:id').put(editfeedback)

module.exports=router;