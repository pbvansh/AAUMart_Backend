const User = require("../model/userModel")

const  getAllUser = async(req,res) =>{
    // const name = req.body.name;
    // if(!name){
    //     throw new Error('please enter your name')
    // }
    const user = await User.find()
    res.status(200).json(user)
}

module.exports = {
    getAllUser,
}