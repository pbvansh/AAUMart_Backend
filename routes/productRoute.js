
const express = require('express')
const {
    addProduct,
    getStaticProduct,
    getAllProducts,
    addImgUrl,
    updateProduct,
    deleteProduct,
} = require('../controller/productController')
const { isAdmin } = require('../middleware/protect')
const route = express.Router()

route.get('/', getAllProducts)
route.get('/:id', getStaticProduct)
route.post('/create',isAdmin,addProduct)
route.put('/:id/addImgUrl', addImgUrl)
route.put('/:id/update', updateProduct)
route.delete('/:id/delete',deleteProduct)

module.exports = route;
