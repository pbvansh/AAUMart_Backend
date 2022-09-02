const express = require('express')
const { 
    addProduct,
    getStaticProduct,
     getAllProducts,
     addImgUrl
    } = require('../controller/productController')
const route = express.Router()

route.get('/',getAllProducts)
route.post('/:id',getStaticProduct)
route.post('/create',addProduct)
route.put('/:id/addImgUrl',addImgUrl)

module.exports = route
