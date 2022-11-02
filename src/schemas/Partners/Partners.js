const mongoose = require("mongoose");

const Partners = mongoose.Schema({
  ServicePartner: [
    {
      name: {
        type: String,
       // required: true,
        trim: true,
      },
      url: {
        type: String,
      },
    },
  ],
  SolutionPartner: [
    {
      name: {
        type: String,
       // required: true,
        trim: true,
      },
      url: {
        type: String,
      },
    },
  ],
  Association: [
    {
      name: {
        type: String,
       // required: true,
        trim: true,
      },
      url: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("Partners", Partners);
