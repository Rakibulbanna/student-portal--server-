const mongoose = require('mongoose');

const User = mongoose.Schema({
    
    mobileNumber:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    date: {
        type:Date,
        default:Date.now,
    }
})
module.exports = mongoose.model("User", User);
