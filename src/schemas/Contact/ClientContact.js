const mongoose = require("mongoose");

const ClientContact = mongoose.Schema({
  name: {
    type: String,
    require:true
  },
  email: {
    type: String,
    require:true
  },
  message:{
    type: String,
    require:true
  },
 
});
module.exports = mongoose.model("ClientContact", ClientContact);
