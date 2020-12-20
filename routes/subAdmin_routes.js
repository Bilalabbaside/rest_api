const express = require('express');
const router = express.Router()// ?;
const sub_Admin= require('../models/subAdmin');
const User= require('../models/user');//user is a collection

router.get('/' ,async(req,res) => {
    try{
        const subAdmin_ = await sub_Admin.find();
        res.json(subAdmin_);
    }
    catch(err){
        res.json({message:err});
    }
   });
   router.get('/:id' ,async(req,res) => {
    try{
        //console.log(req.params.id)
        const subAdmin_ = await sub_Admin.find({"Id":req.params.id});// space issue in db 
        res.json(subAdmin_);
        //console.log(subAdmin);
    }
    catch(err){
        res.json({message:err});
    }
   });

   router.post('/register',async(req,res)=>{
    // const {error} = registerValidation(req.body);
    // if(error) return res.status(404).send(error.details[0].message);
    const emailExists = await sub_Admin.findOne({email:req.body.email})
    if(emailExists) return res.status(400).send({message:"Email already exists",status:false})
    
    const postsubAdmin = new sub_Admin(userObject(req.body));
    console.log(postsubAdmin);
  
    try{
        const savePost=await postsubAdmin.save();
        res.send({message:"Saved Sucessfully",data:savePost,status:true});       
    }
    catch(err){
        res.send({message:err,status:false});
    }
});
router.put('/update/:id',async(req,res)=>{
    const id = req.params.id;
    
    //const pateints = req.body.patients;
    const {name,email,cnic,password,district} = {...userObject(req.body)}
    
    //const {_id,name,email,cnic,password,district,city} = {_id:req.body._id,...userObject(req.body)};//updated values
    sub_Admin.findByIdAndUpdate({_id:id },
        {name,email,cnic,password,district})
        .exec(function(err,result){
            if(err) res.send({message:err,data:null,status:false});

            res.send({message:"Sub Admin Updated Sucessfully",data:result,status:true});
        });
});
//
router.delete('/delete/:id',async(req,res)=>{
    const subAdminId = req.params.id;
    // const userId = req.body.userId
    // try {
    //     const deletedUser = await User.findOne({_id:userId})
    // } catch (error) {
    //     res.send({message:error.message,data:null,status:false})
    // }

    // // console.log("USERID>>>>>",deletedUser._id);
    try {
        const lab = await sub_Admin.findOne({_id:subAdminId})
        // console.log("pateints>>>>>",patients);
        sub_Admin.findByIdAndDelete({_id:subAdminId})
       // {patients : patients.filter(patient=> patient !== deletedUser._id.toString())})
        .exec(function(err,result){
            if(err) res.send({message:err,data:null,status:false});
            res.send({message:"sub Admin deleted Sucessfully",data:result,status:true});
        });
    }
    catch (error) {
        res.send({message:error.message,data:null,status:false})
    }
});
const userObject = ({name,email,password,cnic,district}) => { 
    return {
        name,email,password,cnic,district
}
};    
module.exports=router;

