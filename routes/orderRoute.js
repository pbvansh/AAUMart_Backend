const express = require('express');
const route = express.Router();
const {
    placeOrder,
} = require('../controller/orderController');

route.post('/placeOrder', placeOrder);

module.exports = route;