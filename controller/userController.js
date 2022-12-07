const User = require("../model/userModel")
const Address = require('../model/addressModel')

const  getAllUser = async(req,res) =>{
    const user = await User.find()
    res.status(200).json(user)
}

const getAddress = async (req, res) => {
  try {
    const address = await Address.countDocuments({ user_id: req.user.userId })
    res.status(200).json(address)
  }
  catch(e)  {
    res.status(400).json('error')
  }
}

module.exports = {
  getAllUser,
  getAddress
}