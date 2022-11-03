const mongoose = require('mongoose');

const UserInfo = mongoose.Schema({
    
    name:{
        type: String,
        required: true,
    },
    mobileNumber:{
        type: String,
        required: true,
        unique: true
    },
    department:{
        type:String,
        enum:['SWE','CSE','EEE'],
    },
    sscPoint:{
        type: Number,
        required: true
    },
    hscPoint:{
        type: Number,
        required: true
    },
    semesterName:{
        type:String,
        enum:['1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th','11th','12th']
    },
    specificSemesterAmount:{
        type:Number
    },
    totalpayable:{
        type:Number
    },
    paid:{
        type:Number
    },
    due:{
        type:Number
    }

})

module.exports = mongoose.model('UserInfo',UserInfo);