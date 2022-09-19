const express = require('express')
const route = express.Router()
const User = require('../model/userModel')
const BC = require('bcryptjs')
const asyncHandler = require('express-async-handler')

route.post('/login', asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        res.status(400).json({msg : "Please provide email or password"})
    }

    const user = await User.findOne({email})
    if(user && BC.compare(password,user.password)){

        res.status(200).json({
            auth : true,
            token : user.createJWT()
        })
    }else{
        res.status(400).json({msg : 'invalid email or password'})
    }

    res.status(200).json('login')
}))


//POST signup user
route.post('/signup', asyncHandler(async(req, res) =>{

    const  { name ,email , mobilenumber , password , isAdmin} = req.body;

    if(!email || !password) {
        res.status(400).json("please enter valid email or password")
    }

    const user = await User.create({name,email,mobilenumber,password,isAdmin})
    res.status(200).json(user)
}))



module.exports = route