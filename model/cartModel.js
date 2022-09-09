const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({

    // user_id : {
    //     type : mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // },
    
    product_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required : [true,'please provide product id']
    },

    quantity : {
        type : Number,
        required : [true,'Please provide quantity'],
    }
},
{
    timestamps:true,
})

module.exports = mongoose.model('Cart',cartSchema)