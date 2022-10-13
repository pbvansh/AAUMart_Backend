const express = require('express');
const route = express.Router();
const {
    placeOrder,
    paymentVerification
} = require('../controller/orderController');
const { protect } = require('../middleware/protect');

route.post('/placeOrder',protect, placeOrder);
route.post('payment',paymentVerification)

module.exports = route;