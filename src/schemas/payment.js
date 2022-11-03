const mongoose = require('mongoose');

const payment = mongoose.Schema({
    mobileNumber:{
        type:String
    },
    totalpayable:{
        type:Number,
    },
    semesterName:{
        type:String,
    },
    due:{
        type:Number
    },
    paid:{
        type : Number
    }


})
module.exports = mongoose.model('payment',payment);
