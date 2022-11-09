const mongoose = require('mongoose')
const JWT = require('jsonwebtoken')
require('dotenv').config()
const bc = require('bcryptjs')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'please enter your email']
    },
    mobileNumber: {
        type: Number,
    },
    password: {
        type: String,
        required: [true, 'please enter your password']
    },
    Gender: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
})


userSchema.pre('save', async function () {
    const salt = await bc.genSalt(10)
    this.password = await bc.hash(this.password, salt)
})


userSchema.methods.createJWT = function () {
    return JWT.sign({ userId: this._id, userEmail: this.email, isAdmin: this.isAdmin }, process.env.JWTSECRET, {
        expiresIn: '3d'
    })
}


module.exports = mongoose.model('User', userSchema)