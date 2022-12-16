const express = require('express')
const route = express.Router()
const { protect } = require('../middleware/protect');
const { getAllUser,
  getAddress,
  deleteUser,
  resetPassword
} = require('../controller/userController')

route.get('/', getAllUser)
route.get('/address', protect, getAddress)
route.delete('/:id', protect, deleteUser)
route.post('/reset', resetPassword)

module.exports = route