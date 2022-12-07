const express = require('express')
const route = express.Router()
const { protect } = require('../middleware/protect');
const { getAllUser,
  getAddress
} = require('../controller/userController')

route.get('/', getAllUser)
route.get('/address', protect, getAddress)

module.exports = route