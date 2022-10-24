const express = require('express');
const route = express.Router();
const {
    placeOrder,
    paymentVerification,
    addUserToPayment,
    getAllProducts
} = require('../controller/orderController');
const { protect } = require('../middleware/protect');


route.get('/products', protect, getAllProducts)
route.post('/placeOrder', protect, placeOrder);
route.post('/:id/payment', paymentVerification);
route.put('/:id/addUserId', protect, addUserToPayment);


module.exports = route;