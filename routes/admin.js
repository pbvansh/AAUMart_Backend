const express = require('express');
const { protect } = require('../middleware/protect');
const route = express.Router();
const Order_item = require('../model/order_itemsModel')

route.get('/orders', protect, async(req, res) => {
    try {
        const orders = await Order_item.find()
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).send(error)
    }
    
})

module.exports = route;