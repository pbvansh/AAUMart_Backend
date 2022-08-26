
const  getAllUser = (req,res) =>{
    const name = req.body.name;
    if(!name){
        throw new Error('please enter your name')
    }
    res.status(200).json('getalluser')
}

module.exports = {
    getAllUser,
}