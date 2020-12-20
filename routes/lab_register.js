const express = require('express');
const router = express.Router()// ?;
const labs_= require('../models/labs');//user is a collection
//const {registerValidation} = require('../validation');
const resObject = require('../util/resObject')
 

// Router to add Lab in the system
router.post('/',async(req,res)=>{
    console.log("ab");
 // const {error} = registerValidation(req.body);
 // if(error) return res.status(404).send(error.details[0].message);
 const emailExists = await labs_.findOne({email:req.body.email})
 if(emailExists) return res.status(400).send({message:"Email already exists",status:false})
 
 const postLab = new labs_(userObject(req.body));
 console.log(postLab);
 
 try{
     const saveLab=await postLab.save();
     res.send({message:"Saved Sucessfully",data:saveLab,status:true});       
 }
 catch(err){
     res.send({message:err,status:false});
 }
});
const userObject = ({lab_name,email,password,location,district,city,patients,tests,available_time}) => { 
    return {
        lab_name,email,password,location,district,city,patients,tests,available_time
}
};
module.exports=router;