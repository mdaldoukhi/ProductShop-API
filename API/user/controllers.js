const bcrypt = require("bcrypt")
const { User } = require("../../db/models")

exports.signup = async (req, res, next) => {
    const { password } = req.body;
    const saltRounds = 10
    try {
        const hasedPassword = await bcrypt.hash(password, saltRounds)
        req.body.password = hasedPassword
        const newUser = await User.create(req.body)
        res.status(201).json(newUser)
    } catch (error) {
        next(error)
    }
}