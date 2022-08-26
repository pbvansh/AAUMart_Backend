const express = require('express')
const route = express.Router()

route.post('/login',(req,res)=>{
    res.status(200).json('login')
})

route.post('/signup',(req,res)=>{
    res.status(200).json('register user')
})

module.exports = route