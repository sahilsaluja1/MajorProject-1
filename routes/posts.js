const express=require('express');
const router=express.Router();
const Passport=require('passport');
const postController=require('../controllers/post_controller');

router.post('/create',Passport.checkAuthentication,postController.createPost);

module.exports=router;