const express = require('express');
const { protect } = require('../middleware/protect');
const route = express.Router();

route.get('/me', protect, (req, res) => {
    res.status(200).json(req.user)
})

module.exports = route;