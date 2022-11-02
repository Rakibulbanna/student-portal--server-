const mongoose = require("mongoose");

const Training = mongoose.Schema({
  Security: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SecurityTraining",
        // required: true,
    },
  ],
  Assessment: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assessment",
      // required: true,
    },
  ],
  Management: [
    {

        type: mongoose.Schema.Types.ObjectId,
        ref: "Management",
        // required: true,
    },
  ],
  Customized: [
    {

        type: mongoose.Schema.Types.ObjectId,
        ref: "Customized",
        required: true,
    },
  ],
});

// const Training = mongoose.Schema({
//   SecurityTraining: [{
//     name: {
//       type: String,
//     },
//     UI: {
//       coverPhoto: {
//         type: String,
//         require: true,
//       },
//       divTitle: {
//         type: String,
//         require: true,
//       },
//       divDescription: {
//         type: String,
//         require: true,
//       },
//     }

// }],
//   Assessment: [{
//     name: {
//       type: String,
//     },
//     UI: {
//       coverPhoto: {
//         type: String,
//         require: true,
//       },
//       divTitle: {
//         type: String,
//         require: true,
//       },
//       divDescription: {
//         type: String,
//         require: true,
//       },
//     }

// }],
//   Management: [{
//     name: {
//       type: String,
//     },
//     UI: {
//       coverPhoto: {
//         type: String,
//         require: true,
//       },
//       divTitle: {
//         type: String,
//         require: true,
//       },
//       divDescription: {
//         type: String,
//         require: true,
//       },
//     }

// }],
//   Customized: [{
//     name: {
//       type: String,
//     },
//     UI: {
//       coverPhoto: {
//         type: String,
//         require: true,
//       },
//       divTitle: {
//         type: String,
//         require: true,
//       },
//       divDescription: {
//         type: String,
//         require: true,
//       },
//     }

// }],

// });

module.exports = mongoose.model("Training", Training);
