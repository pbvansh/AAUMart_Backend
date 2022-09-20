const mongoose = require('mongoose')
const JWT = require('jsonwebtoken')
require('dotenv').config()

const userSchema = new mongoose.Schema({
    name : {
        type:String,
    },
    email : {
        type:String,
        required : [true , 'please enter your email']
    },
    mobilenumber : {
        type:Number,
 
    },
    password : {
        type:String,
        required : [true , 'please enter your password']
    },
    isAdmin : {
        type : Boolean,
        default : false,
    }
})

userSchema.methods.createJWT = function(){
    return JWT.sign({userId :this._id , userEmail : this.email},process.env.JWTSECRET,{
        algorithm : ['ES384'],
        expiresIn: '3d'
    })
}


module.exports = mongoose.model('User',userSchema)