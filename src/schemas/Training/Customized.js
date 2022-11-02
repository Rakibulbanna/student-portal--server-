const mongoose = require('mongoose');

const Customized = mongoose.Schema({
    
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
module.exports = mongoose.model('Customized',Customized);