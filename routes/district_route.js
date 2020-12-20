const express = require('express');
const router = express.Router()// ?;
const Posts= require('../models/districts');
const User= require('../models/user');//user is a collection

router.get('/' ,async(req,res) => {
    try{
        const districts = await Posts.find();
        res.json(districts);
    }
    catch(err){
        res.json({message:err});
    }
   });
   router.get('/:id' ,async(req,res) => {
    try{
        //console.log(req.params.id)
        const districts = await Posts.find({"Id":req.params.id});// space issue in db 
        res.json(districts);
        //console.log(districts);
    }
    catch(err){
        res.json({message:err});
    }
   });


router.put('/update/:id',async(req,res)=>{
    const id = req.params.id;
    
    const pateints = req.body.patients;
   
    
    //const {_id,name,email,cnic,password,district,city} = {_id:req.body._id,...userObject(req.body)};//updated values
    Posts.findByIdAndUpdate({_id:id },
        {patients:pateints})
        .exec(function(err,result){
            if(err) res.send({message:err,data:null,status:false});

            res.send({message:"district Updated Sucessfully",data:result,status:true});
        });
});
//
router.delete('/delete',async(req,res)=>{
    const districtId = req.body.districtId;
    const userId = req.body.userId
    try {
        const deletedUser = await User.findOne({_id:userId})
    } catch (error) {
        res.send({message:error.message,data:null,status:false})
    }

    // console.log("USERID>>>>>",deletedUser._id);
    try {
        const district = await Posts.findOne({_id:districtId})
        // console.log("pateints>>>>>",patients);
        Posts.findByIdAndUpdate({_id:districtId},
        {patients : patients.filter(patient=> patient !== deletedUser._id.toString())})
        .exec(function(err,result){
            if(err) res.send({message:err,data:null,status:false});
            res.send({message:"district Updated Sucessfully",data:result,status:true});
        });
    }
    catch (error) {
        res.send({message:error.message,data:null,status:false})
    }
});
    
module.exports=router;

