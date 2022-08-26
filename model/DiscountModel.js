const mongoose = require('mongoose')

const discountSchema = new mongoose.Schema({

    name : {
        type : String,
        required : [true,'please provide discount name']
    },
    desc : {
        type : String,
    },
    discount_percent : {
        type : Number,
        required : [true,'please provide discount percent']
    },
    active : {
        type : Boolean,
        default : false
    }
},
{
    timestamps:true
}) 

module.exports = mongoose.model('Discount',discountSchema)