const mongoose = require('mongoose')

const addressShema = new mongoose.Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    name :{
        type: String,
        required : [true,'please provide address line 1']
    },
    mobile : {
        type : Number,
        required :[true,'please provide you mobile number']
    },
    pincode : {
        type :Number,
        required : [true,'please provide your country']
    },
    locality :{
        type :String,
        required : [true,'please provide your postal_code']
    },
    address :{
        type :String,
        required : [true,'please provide your postal_code']
    },
    city : {
        type :String,
        required : [true,'please provide your city']
    },
    state : {
        type :String,
        required : [true,'please provide your city']
    },
    type : {
        type :String,
        enum : ['Home','Work'],
        required : [true,'please provide address type']
    },
},{timestamps : true})

module.exports = mongoose.model('Address',addressShema)