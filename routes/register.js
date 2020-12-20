const express = require('express');
const router = express.Router()// ?;
const User= require('../models/user');//user is a collection
//const {registerValidation} = require('../validation');
const resObject = require('../util/resObject')
const bcrypt = require('bcryptjs');


router.post('/',async(req,res)=>{
    // const {error} = registerValidation(req.body);
    // if(error) return res.status(404).send(error.details[0].message);
    const emailExists = await User.findOne({email:req.body.email})
    if(emailExists) return res.status(400).send({message:"Email already exists",status:false})
    const salt = await bcrypt.gensalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);
    const postUser = new User(userObject(req.body.name,req.body.email,req.body.cnic,hashPassword,req.body.district,req.body.city));
    console.log(postUser);
  
    try{
        const savePost=await postUser.save();
        res.send({message:"Saved Sucessfully",data:savePost,status:true});       
    }
    catch(err){
        res.send({message:err,status:false});
    }
});
router.put('/update',async(req,res)=>{

    const {_id,name,email,cnic,password,district,city} = {_id:req.body._id,...userObject(req.body)};//updated values
    User.findByIdAndUpdate({_id:_id},
        {name,email,cnic,password,district,city})
        .exec(function(err,result){
            if(err) res.send({message:err,data:null,status:false});

            res.send({message:"Profile Updated Sucessfully",data:result,status:true});
        }); 

});
router.delete('/delete',async(req,res)=>{

    const _id = req.body._id;

    User.findByIdAndDelete({_id:_id})
.exec(function(err,result){
            if(err) res.send({message:err,data:null,status:false});

            res.send({message:"Profile Deleted Sucessfully",data:result,status:true});
        }); 

});
    
// //get req body and returns user object
const userObject = ({name,email,cnic,hashPassword,district,city}) => { 
        return {
        name:name,
        email:email,
        cnic:cnic,
        password:hashPassword,
        district:district,
        city:city
    }
};

// //get req body and returns user object
// function userObject(object)
// {
//     return {name:object.name,
//     email:object.email,
//     cnic:objectcnic,
//     password:object.password,
//     district:object.district,
//     city:object.city}
// }


module.exports=router;