const mongoose = require('mongoose');
const PostSchema = mongoose.Schema({
    Id:{
    type:String,
    required:true
},
admin_name:{
    type:String,
    required:true
},
city: {
    type:String,
    required:true
},
lat:{
    type:String,
    required:true
},
lng:{
    type:String,
    required:true
},
province:{
    type:String,
    required:true
},


capital:{
    type:String,
    required:true
},
population:{
    type:String,
    required:true
},
population_proper:{
    type:String,
    required:true
},
patients:{
    type:[]
}
});


module.exports=mongoose.model('post',PostSchema);