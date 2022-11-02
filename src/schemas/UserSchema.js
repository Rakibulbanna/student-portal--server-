const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    
    mobileNumber:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        require:true
    },
    date: {
        type:Date,
        default:Date.now,
    }
})
//const User = mongoose.model("user", userSchema);
//module.exports = User;
module.exports = userSchema;
