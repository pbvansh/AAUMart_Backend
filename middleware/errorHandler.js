const errorHandler = (err,req,res,next)=>{
    
    res.json(err.message)
}

module.exports = {
    errorHandler
}