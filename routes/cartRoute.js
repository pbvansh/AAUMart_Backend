const express = require('express')
const route = express.Router()
const {
  addProductToCart,
  removeProductToCart,
  updateProductToCart,
  getItemToCart,
  getTotalNoOfItem
} = require('../controller/cartController')

route.post('/addItem', addProductToCart);
route.get('/getTotal/:id', getTotalNoOfItem)
route.delete('/:id', removeProductToCart);
route.put('/:id', updateProductToCart);
route.get('/:id', getItemToCart);

module.exports = route;