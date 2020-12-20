const express = require('express');
const router = express.Router()// ?;
const labs_= require('../models/labs');
const User= require('../models/user');//user is a collection
// Router to Get Data of All Labs
router.get('/' ,async(req,res) => {
    try{
        const labs = await labs_.find();
        res.json(labs);
    }
    catch(err){
        res.json({message:err});
    }
   });
// Router to get Data of specific Lab
   router.get('/:id' ,async(req,res) => {
    try{
        //console.log(req.params.id)
        const labs = await labs_.find({"_id":req.params.id});// space issue in db 
        res.json(labs);
        //console.log(labs);
    }
    catch(err){
        res.json({message:err});
    }
   });
// Router to add Lab in the system
   router.post('/addLab',async(req,res)=>{
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
// Router to update Lab 
router.put('/update/:id',async(req,res)=>{
    const id = req.params.id;
    // const pateints = req.body.patients;

    const {lab_name,email,password,location,district,city,patients,tests,available_time} = 
    {...userObject(req.body)};//updated values
    
    labs_.findByIdAndUpdate({_id:id },{lab_name,email,password,location,district,city,patients,tests,available_time})
        
    .exec(function(err,result){
            if(err) res.send({message:err,data:null,status:false});

            res.send({message:"lab Updated Sucessfully",data:result,status:true});
        });
});
// Router to delete Lab
router.delete('/delete/:id',async(req,res)=>{
    const labId = req.params.id;
    // const userId = req.body.userId
    // try {
    //     const deletedUser = await User.findOne({_id:userId})
    // } catch (error) {
    //     res.send({message:error.message,data:null,status:false})
    // }

    // // console.log("USERID>>>>>",deletedUser._id);
    try {
        const lab = await labs_.findOne({_id:labId})
        // console.log("pateints>>>>>",patients);
        labs_.findByIdAndDelete({_id:labId})
       // {patients : patients.filter(patient=> patient !== deletedUser._id.toString())})
        .exec(function(err,result){
            if(err) res.send({message:err,data:null,status:false});
            res.send({message:"lab deleted Sucessfully",data:result,status:true});
        });
    }
    catch (error) {
        res.send({message:error.message,data:null,status:false})
    }
});
const userObject = ({lab_name,email,password,location,district,city,patients,tests,available_time}) => { 
    return {
        lab_name,email,password,location,district,city,patients,tests,available_time
}
};
    
module.exports=router;

