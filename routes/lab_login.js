const express = require('express');
const router = express.Router()// ?;
const lab_= require('../models/labs');//lab_ is a collection
//const {registerValidation} = require('../validation');


router.post('/',async(req,res)=>{
    //  const users = await lab_.find();
    //  console.log(users);
    let email = req.body.email;
    let password = req.body.password;
    let lab = await lab_.findOne({email:email,password:password});
    if(!lab) return res.status(400).send("Not found")
    res.send(`Logged in \n${lab}`)
});
    
module.exports=router;