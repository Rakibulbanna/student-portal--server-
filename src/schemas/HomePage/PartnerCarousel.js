const mongoose = require('mongoose')

const PartnerCarousel = mongoose.Schema({
    imgURL: {
    type:String,
    required: true
    }
})

module.exports = PartnerCarousel;