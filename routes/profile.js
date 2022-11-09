const express = require('express');
const { protect } = require('../middleware/protect');
const route = express.Router();
const User = require('../model/userModel')

route.get('/me', protect, async (req, res) => {
    const user = await User.findById(req.user.userId).select('-password')
    res.status(200).json(user)
})

route.put('/update/me', protect, async (req, res) => {
    const user = await User.findByIdAndUpdate(req.user.userId, req.body, { new: true }).select('-password')
    res.status(200).json(user)
})

module.exports = route;