const LocalStrategy = require("passport-local").Strategy
const { User } = require("../db/models")
const bycrpt = require("bcrypt")


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