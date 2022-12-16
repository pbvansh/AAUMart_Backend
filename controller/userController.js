const User = require("../model/userModel")
// const fetch = require('node-fetch')
const Address = require('../model/addressModel')
import fetch from "node-fetch"




const getAllUser = async (req, res) => {
  const user = await User.find().select('-password')
  res.status(200).json(user)
}

const resetPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.find({ email })

  if (user) {
    const OTP = Math.floor(Math.random() * 1000000);
    console.log(OTP)
    var data = {
      service_id: process.env.YOUR_SERVICE_ID,
      template_id: process.env.YOUR_TEMPLATE_ID,
      user_id: process.env.YOUR_PUBLIC_KEY,
      template_params: {
        'to_name': email,
        'message': OTP
      }
    }
    console.log(data)
    fetch('https://api.emailjs.com/api/v1.0/email/send', {
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json'
    }).then(function() {
      res.status(200).json({ msg: 'We send you OPT please check you email', OTP })
    }).catch(function(error) {
      res.status(200).json({ msg: 'Oops... ' + error });
    });
  } else {
    res.status(200).json({ msg: 'invalid email' })
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
  resetPassword
}