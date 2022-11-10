const express = require('express');
const { protect } = require('../middleware/protect');
const route = express.Router();
const User = require('../model/userModel')
const Address = require('../model/addressModel')

route.get('/me', protect, async (req, res) => {
    const user = await User.findById(req.user.userId).select('-password')
    res.status(200).json(user)
})

route.put('/update/me', protect, async (req, res) => {
    const user = await User.findByIdAndUpdate(req.user.userId, req.body, { new: true }).select('-password')
    res.status(200).json(user)
})

route.get('/addresses/me',protect,async(req,res)=>{
        const addresses = await Address.find({user_id : req.user.userId})
        res.status(200).json(addresses)
})

route.post('/address/create',protect,async(req,res)=>{
    req.body.user_id = req.user.userId
    const address = await Address.create(req.body);
    res.status(200).json(address)
})



module.exports = route;