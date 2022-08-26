const express = require('express')
const route = express.Router()
const {
    getAllCat,
    addCategory,
} = require('../controller/catController')

route.get('/',getAllCat)
route.post('/addNew',addCategory)

module.exports = route