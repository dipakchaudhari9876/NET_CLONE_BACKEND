const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('./../Schema/UserSchema')

const authenticate = async (req, res, next) => {
    try {
        const token = req.query.jwtoken
        if (!token) {
            return res.status(400).json({ error: "User not verified" })
        }

        const verifyToken = jwt.verify(token,process.env.JWT_SECRET_KEY)
        const check = await User.findOne({_id:verifyToken.id})
        if(!check){
            return res.status(400).json({ error: "User not verified" })
        }
        req.email = check.email 
        next()
    } catch (err) {
        console.log(err)
    }

}

module.exports = authenticate