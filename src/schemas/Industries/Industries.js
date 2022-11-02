const mongoose = require('mongoose')

const Industries = mongoose.Schema({
    BankandNBFI:{
        coverPhoto:{
            type:String,
            require: true
        },
        div_1_title:{
            type: String,
            require: true
        },
        div_1_description:{
            type: String,
            require: true
        },
        div_2_title:{
            type: String,
            require: true
        },
        div_2_description:{
            type: String,
            require: true
        }
    },
    CardIndustry:{
        coverPhoto:{
            type:String,
            require: true
        },
        div_title:{
            type: String,
            require: true
        },
        div_description:{
            type: String,
            require: true
        }
    },
    eCommerce:{
        coverPhoto:{
            type:String
        },
        div_1_title:{
            type: String,
            require: true
        },
        div_1_description:{
            type: String,
            require: true
        },
        div_2_title:{
            type: String,
            require: true
        },
        div_2_description:{
            type: String,
            require: true
        }
    },
    EducationalInstitutions:{
        coverPhoto:{
            type:String
        },
        div_1_title:{
            type: String,
            require: true
        },
        div_1_description:{
            type: String,
            require: true
        },
        div_2_title:{
            type: String,
            require: true
        },
        div_2_description:{
            type: String,
            require: true
        }
    },
    HealthCare:{
        coverPhoto:{
            type:String
        },
        div_1_title:{
            type: String,
            require: true
        },
        div_1_description:{
            type: String,
            require: true
        },
        div_2_title:{
            type: String,
            require: true
        },
        div_2_description:{
            type: String,
            require: true
        }, 
        div_3_title:{
            type: String,
            require: true
        },
        div_3_description:{
            type: String,
            require: true
        } 
    },
    Telecommunications:{
        coverPhoto:{
            type:String
        },
        div_1_title:{
            type: String,
            require: true
        },
        div_1_description:{
            type: String,
            require: true
        },
        div_2_title:{
            type: String,
            require: true
        },
        div_2_description:{
            type: String,
            require: true
        }
    }
})

module.exports = mongoose.model('Industries',Industries);