const express=require('express');

const router=express.Router();
const controller=require('../controllers/controller_module');
router.get('/',controller.boot);
console.log("Fuck off");
module.exports=router;