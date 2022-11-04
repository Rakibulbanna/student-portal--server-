const passport = require('passport')
const jwt = require('jsonwebtoken');

module.exports.authentication = (req, res, next) => {
   

    passport.authenticate('jwt', (err, user, info) => {
        if (err) {
            console.log(info)
            console.log(err)
            return next(err)
        }

        if (!user) {
            return res.status(400).json({
                message: 'Authentication Failed'
            })
        }
        

        req.user = user
        
        return next()
    })(req, res, next)
}

module.exports.checkUser = (req, res, next)=>{
    
    if(req.params.mobileNumber == req.user.mobileNumber){
        return next()
    }
    else{
        return res.status(400).json({
            message: 'This is not your route!'
        })
    }
    
}