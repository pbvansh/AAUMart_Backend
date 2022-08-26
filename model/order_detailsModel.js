const mongoose = require('mongoose')

const order_detailsSchema = new mongoose.Schema({

    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    total : {
        type : Number,
    },
    paymet_id : {
        type : String, // mongoose.Schema.Types.ObjectId
    }
},
{
    timestamps:true
})

module.exports = mongoose.model('Order_details',order_detailsSchema);