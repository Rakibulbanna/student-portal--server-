const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    description: String,
    status: {
        type:String,
        enum:['active','inactive'],
    },
    date: {
        type:Date,
        default:Date.now,
    }
})

//instance method

todoSchema.methods = {
    findActive: function(){
        return mongoose.model('Todo').find({status:'active'})
    },
    //call back way
    findActiveCallback: function(cl){
        return mongoose.model('Todo').find({status:'active'},cl)
    }
}

//static methods

todoSchema.statics = {
    findByJS: function(){
       return this.find({title: new RegExp('do','i')});
    }
}
//user define query helpers

todoSchema.query = {
    byLanguage: function(language){
       return this.find({title: new RegExp(language,'i')}); //regular expression
    }
}

module.exports = todoSchema;