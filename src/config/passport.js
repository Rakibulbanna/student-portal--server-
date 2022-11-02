const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose');

const userSchma = require('../schemas/UserSchema')
const User = new mongoose.model('user',userSchma);

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'RAKIB';

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (payload, done) => {
        User.findOne({ _id: payload._id })
            .then(user => {
                if (!user) {
                    return done(null, false) 
                } else {
                    return done(null, user)
                }
            })
            .catch(error => {
                console.log(error)
                return done(error)
            })
    }))
}