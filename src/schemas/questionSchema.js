
const mongoose = require('mongoose')

const questionSchema = mongoose.Schema({
    questionMakerID: {
        type: String,
        required: true,
    },
    question:{
        type: String,
        required: true,
        unique: true
    },
    Comments:[
        
    {
        description:{
            type: String,
        },
        replyerID:{
            required: true,
            type: String,
        }
    }
]

});

module.exports = questionSchema;