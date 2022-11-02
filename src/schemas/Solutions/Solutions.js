const mongoose = require('mongoose')

const Solutions = mongoose.Schema({
    name:{
        type:String
    },
    UI:{
        coverPhoto:{
            type:String,
            require: true
        },
        divTitle:{
            type: String,
            require: true
        },
        divDescription:{
            type: String,
            require: true
        },
    },
    // BurpSuite,
    // Acunetix,
    // Netsparker,
    // CoreImpact,
    // SIEMSolutions,
    // Firewall,
    // BulkSMS,
    // SmartContract
})

module.exports = mongoose.model("Solutions",Solutions);