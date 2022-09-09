const express = require('express')
const route = express.Router()
const {
    addProductToCart,
    removeProductToCart,
    updateProductToCart
} = require('../controller/cartController')

route.post('/addItem',addProductToCart);
route.delete('/:id',removeProductToCart);
route.put('/:id',updateProductToCart);

module.exports = route;