const express = require('express')
const route = express.Router()
const { protect } = require('../middleware/protect');
const { getAllUser,
  getAddress,
  deleteUser
} = require('../controller/userController')

route.get('/', getAllUser)
route.get('/address', protect, getAddress)
route.delete('/:id', protect, deleteUser)

module.exports = route