const User = require("../model/userModel")
const fetch = require('node-fetch')
const Address = require('../model/addressModel')
const bc = require('bcryptjs')

const getAllUser = async (req, res) => {
  const user = await User.find().select('-password')
  res.status(200).json(user)
}
const changePassword = async (req, res) => {
  let { email, password } = req.body;
  console.log(email, password);
  if (email && password) {
    const salt = await bc.genSalt(10)
    password = await bc.hash(password, salt);
    const user = await User.findOneAndUpdate({ email }, { password }, { new: true });
    console.log(user);
    res.status(200).json({ msg: 'Password changed successfully', done: true })
  } else {
    res.status(200).json({ msg: 'Enter your new password', done: false })
  }
}

const resetPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email })

  if (user) {
    const OTP = Math.floor(Math.random() * 10000000);
    res.status(200).json({ msg: true, OTP })
    //   const OTP = Math.floor(Math.random() * 1000000);
    //   var data = {
    //     service_id: process.env.YOUR_SERVICE_ID,
    //     template_id: process.env.YOUR_TEMPLATE_ID,
    //     user_id: process.env.YOUR_PUBLIC_KEY,
    //     template_params: {
    //       'to_name': email,
    //       'message': OTP
    //     }
    //   }
    //   fetch('https://api.emailjs.com/api/v1.0/email/send', {
    //     type: 'POST',
    //     data: JSON.stringify(data),
    //     contentType: 'application/json'
    //   }).then(function(r) {
    //     res.status(200).json({ msg: 'We send you OPT please check you email', OTP })
    //   }).catch(function(error) {
    //     res.status(200).json({ msg: 'Oops... ' + error });
    //   });
  } else {
    res.status(200).json({ msg: false })
  }
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
  deleteUser,
  resetPassword,
  changePassword
}