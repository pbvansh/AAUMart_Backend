const User = require("../model/userModel")

const  getAllUser = async(req,res) =>{
    const user = await User.find()
    res.status(200).json(user)
}

module.exports = {
    getAllUser,
}