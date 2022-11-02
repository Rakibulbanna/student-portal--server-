const mongoose = require("mongoose");

const Contact = mongoose.Schema({
  title: {
    type: String,
  },
  coverPhoto: {
    type: String,
  },
  address:{
    type: String
  },
  phone:{
    type: String
  },
  email:{
    type: String
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("Contact", Contact);
