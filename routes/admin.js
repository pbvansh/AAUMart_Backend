const express = require('express');
const { protect } = require('../middleware/protect');
const route = express.Router();
const Order_item = require('../model/order_itemsModel')
const Address = require('../model/addressModel')

route.get('/orders', protect, async (req, res) => {
    try {
        const orders = await Order_item.find().populate('products.id')
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).send(error)
    }
})

route.put('/order/:id', protect, async (req, res) => {
    try {
        const id = req.params.id;
        const order = await Order_item.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(order)
    } catch (error) {
        res.status(500).send(error)
    }
})

route.get('/order/address/:id', async (req, res) => {
    try {
        const user_id = req.params.id;
        const address = await Address.findOne({ user_id })
        res.status(200).json(address)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = route;