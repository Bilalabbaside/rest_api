const mongoose = require('mongoose');
const PostSchema = mongoose.Schema({
    lab_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    patients:{
        type: []
    },
    tests: {
        type: [],
        required:true
    },
    available_time:{
        type:String,
        required:true
    }
});



module.exports = mongoose.model('labs', PostSchema);