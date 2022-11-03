const validator = require('validator')

const validate = user => {
    let error = {}

    if (!user.mobileNumber) {
        error.mobileNumber = 'Please Provide Your mobile Number'
    }else if (user.mobileNumber.length == 10) {
        error.mobileNumber = 'mobile Number Must be Equal to 11 Character'
    }

    if (!user.password) {
        error.password = 'Please Provide a Password'
    } else if (user.password.length < 8) {
        error.password = 'Password Must be Greater or Equal 8 Character'
    }

    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

module.exports = validate;