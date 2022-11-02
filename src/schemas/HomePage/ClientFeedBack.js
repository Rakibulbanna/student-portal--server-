
const mongoose = require('mongoose')

const ClientFeedBack = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        require:true
    },
    photoURL:{
        type: String,
    },
    designation:{
        type:String,
        required: true
    }

});

module.exports = ClientFeedBack;