const express = require('express');
const route = express.Router();
const {
    placeOrder,
} = require('../controller/orderController');
const { protect } = require('../middleware/protect');

route.post('/placeOrder',protect, placeOrder);

module.exports = route;