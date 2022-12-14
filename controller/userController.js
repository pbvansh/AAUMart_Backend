const User = require("../model/userModel")
const Address = require('../model/addressModel')

const getAllUser = async (req, res) => {
  const user = await User.find().select('-password')
  res.status(200).json(user)
}

const getAddress = async (req, res) => {
  try {
    const address = await Address.countDocuments({ user_id: req.user.userId })
    res.status(200).json(address)
  }
  catch (e) {
    res.status(400).json('error')
  }
}

const deleteUser = async (req, res) => {
  const _id = req.params.id;
  const { firstName } = await User.findByIdAndDelete({ _id });
  res.status(200).json({ msg: `${firstName ? firstName + 'account deleted successfully' : 'account deleted successfully'}` })
}

module.exports = {
  getAllUser,
  getAddress,
  deleteUser
}