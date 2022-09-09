const mongoose = require('mongoose')

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
        required : [true , 'please enter your mobile number']
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


module.exports = mongoose.model('User',userSchema)