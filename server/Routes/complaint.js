const express=require('express')
const router=express.Router()
const {addcomplaint,getcomplaint,editcomplaint,getsinglecomplaint}=require('../controller/complaintController')

const {isLoggedIn}=require('../middlewares/user')

router.route('/addcomplain').post(isLoggedIn,addcomplaint)
router.route('/getcomplain').get(isLoggedIn,getcomplaint)
router.route('/updatecomplaint/:id').put(editcomplaint)
router.route('/getsinglecomplain/:id').get(getsinglecomplaint)
module.exports=router;