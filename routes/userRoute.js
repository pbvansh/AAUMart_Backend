const express = require('express')
const route = express.Router()
const { protect } = require('../middleware/protect');
const { getAllUser,
  getAddress,
  deleteUser,
  resetPassword,
  changePassword
} = require('../controller/userController')

route.get('/', getAllUser)
route.get('/address', protect, getAddress)
route.delete('/:id', protect, deleteUser)
route.post('/resrt',resetPassword)
route.post('/changePassword',changePassword)

module.exports = route