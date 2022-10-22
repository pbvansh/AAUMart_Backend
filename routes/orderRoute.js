const express = require('express');
const route = express.Router();
const {
    placeOrder,
    paymentVerification,
    addUserToPayment
} = require('../controller/orderController');
const { protect } = require('../middleware/protect');

route.post('/placeOrder', protect, placeOrder);
route.post('/payment', paymentVerification);
route.put('/:id/addUserId', protect, addUserToPayment)

module.exports = route;