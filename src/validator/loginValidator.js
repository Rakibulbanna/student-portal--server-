const validator = require('validator')

const validate = user => {
    let error = {}

    if (!user.mobileNumber) {
        error.mobileNumber = 'Please Provide Your mobile Number'
    }

    if (!user.password) {
        error.password = 'Please Provide a Password'
    }

    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

module.exports = validate