const express = require('express');
const route = express.Router();
const {
    placeOrder,
    paymentVerification,
    addUserToPayment,
    getAllProducts
} = require('../controller/orderController');
const { protect } = require('../middleware/protect');

route.post('/placeOrder', protect, placeOrder);
route.post('/:id/payment', paymentVerification);
route.put('/:id/addUserId', protect, addUserToPayment);
route.post('/products',protect,getAllProducts)

module.exports = route;