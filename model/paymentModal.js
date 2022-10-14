const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({

    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    razorpay_order_id : {
        type : String,
        required :true
    },
    razorpay_payment_id : {
        type : String,
        required :true
    },
    razorpay_signature : {
        type : String,
        required :true
    }

},{
    timestamps : true
})

module.exports = mongoose.model('Payment',paymentSchema)