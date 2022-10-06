const express = require('express')
const route = express.Router()
const {
    getAllCat,
    addCategory,
    deleteCategory
} = require('../controller/catController')

route.get('/',getAllCat)
route.post('/addNew',addCategory)
route.delete('/:id',deleteCategory)

module.exports = route