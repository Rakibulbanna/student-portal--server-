const mongoose = require('mongoose');

const Assessment = mongoose.Schema({
    
        name: {
          type: String,
          require: true,
          unique: true
        },
        UI: {
          coverPhoto: {
            type: String,
            require: true,
          },
          divTitle: {
            type: String,
            require: true,
          },
          divDescription: {
            type: String,
            require: true,
          },
        }
      
})
module.exports = mongoose.model('Assessment',Assessment);