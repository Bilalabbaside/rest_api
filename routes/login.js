const express = require('express');
const router = express.Router()// ?;
const User= require('../models/user');//user is a collection
//const {registerValidation} = require('../validation');
const bcrypt = require('bcryptjs');

router.post('/',async(req,res)=>{
    // const users = await User.find();
    // console.log(users);
    
    let email = req.body.email;
    let password = req.body.password;
    let user = await User.findOne({email:email,password:password});
    if(!user) return res.status(400).send("Not found")
    res.send(`Logged in \n${user}`)
});
    
module.exports=router;