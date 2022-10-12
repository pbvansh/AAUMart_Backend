
const asyncHandler = require('express-async-handler');
const Order = require('../model/order_itemsModel')
const Stripe = require('stripe')
const {v4} =require('uuid')

const placeOrder = asyncHandler(async (req, res) => {
    const { products, quantity } = req.body;
    if(products){
        const order = await Order.create(req.body)
        res.status(200).json(order)
    }else{
        res.status(400).json({"msg":"please provide product info"})
    }
    
})

module.exports = {
    placeOrder,
}