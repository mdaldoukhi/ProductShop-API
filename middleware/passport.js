const LocalStrategy = require("passport-local").Strategy
const JWTStrategy = require("passport-jwt").Strategy
const { fromAuthHeaderAsBearerToken } = require('passport-jwt').ExtractJwt
const { JWT_SECERT } = require('../config/keys')
const bycrpt = require("bcrypt")

const { User } = require("../db/models")

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
    try {
        const user = await User.findOne({
            where: { username }
        })
        const passwordsMatch = user
            ? await bycrpt.compare(password, user.password)
            : false;
        if (passwordsMatch) {
            return done(null, user)
        } else {
            return done(null, false)
        }
    } catch (error) {
        done(error)
    }
})

exports.jwtStrategy = new JWTStrategy({
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECERT
},
    async (jwtPayload, done) => {
        if (Date.now() > jwtPayload.exp) {
            return done(null, false)
        }
        try {
            const user = await User.findByPk(jwtPayload.id)
            done(null, user)
        } catch (error) {
            done(error)
        }
    })