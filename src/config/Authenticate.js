const passport = require('passport')

module.exports.authentication = (req, res, next) => {
    // const BearerToken = req.headers.authorization;
    // const token = token.split('Bearer ')[1];
    

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