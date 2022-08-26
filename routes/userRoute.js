const express = require('express')
const route = express.Router()
const {getAllUser,
} = require('../controller/userController')

route.get('/',getAllUser)
//route.post('/')
//route.patch()
//route.delete()

module.exports = route