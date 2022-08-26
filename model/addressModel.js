const mongoose = require('mongoose')

const addressShema = new mongoose.Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    address_line1 :{
        type: String,
        required : [true,'please provide address line 1']
    },
    address_line2 :{
        type: String,
        required : [true,'please provide address line 2']
    },
    country : {
        type :String,
        required : [true,'please provide your country']
    },
    city : {
        type :String,
        required : [true,'please provide your city']
    },
    postal_code :{
        type :String,
        required : [true,'please provide your postal_code']
    },
    mobile : {
        type : String,
        required :[true,'please provide you mobile number']
    },
},{timestamps : true})

module.exports = mongoose.model('Address',addressShema)