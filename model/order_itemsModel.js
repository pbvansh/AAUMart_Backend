const mongoose = require('mongoose')

const order_itemsSchema = new mongoose.Schema({
 
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Order_details'
    },
    product_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Product'
    },
    quantity : {
        type : Number,
        required : true,
    }
},
{ 
    timestamps: true
})

module.exports = mongoose.model('Order_items',order_itemsSchema)