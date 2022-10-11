const express = require('express')
const route = express.Router()
const User = require('../model/userModel')
const BC = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const JWT = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
require('dotenv').config()

route.post('/login', asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            res.status(400).json({ msg: "Please provide email or password" })
        } else {
            const user = await User.findOne({ email })
            if (user && await BC.compare(password, user.password)) {
                res.cookie('AAU-token', user.createJWT())
                res.status(200).json({
                    auth: true,
                    user: user.email,
                    token: user.createJWT()
                })
            } else {
                res.status(400).json({ msg: 'invalid email or password' })
            }
        }
    } catch (error) {
        res.status(400).json({ msg: 'invalid email or password' })
    }


}))


//POST signup user
route.post('/signup', asyncHandler(async (req, res) => {

    const { name, email, mobilenumber, password, isAdmin } = req.body;
    try {
        if (!email || !password) {
            res.status(400).json("please enter valid email or password")
        }

        const user = await User.create({ name, email, mobilenumber, password, isAdmin })
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ msg: error.code && ('Email address is already exist') })
    }
}))

// verify JWT 

const verifyJWT = async (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        res.status(400).json({ msg: "No token, please provide token." })
    }
    else {
        try {
            const payload = JWT.decode(token)
            const user = await User.findById(payload.userId).select('-password')
            if (payload.userEmail == user.email) {
                req.user = user;
                next()
            }
        } catch (error) {
            console.log(error);
        }
    }
}

// check with help of token user is authorize or not

route.get('/isUserAuth', verifyJWT, asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
}))

route.get('/setcookie', (req, res) => {
    res.cookie('token', 'pratik vansh token', {
        secure: true,
        httpOnly: false,
    });
    res.send('Cookie have been saved successfully');
})

route.get('/deletecookie', (req, res) => {
    //show the saved cookies
    //res.clearCookie()
    console.log(req.cookies);
    res.status(200).send(req.cookies);
});

module.exports = route;