const mongoose = require('mongoose')

const order_itemsSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order_details',
        required: true,
    },
    products: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: { type: Number, required: true, default: 1 }
        }
    ],
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Order Placed', 'Preparing', 'Shipped', 'Delivered'],
        default: 'Order Placed',
        required: true
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model('Order_items', order_itemsSchema)