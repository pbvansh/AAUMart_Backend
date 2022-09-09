const asyncHandler = require('express-async-handler')
const Cart = require('../model/cartModel')

const addProductToCart = asyncHandler(async(req,res)=>{

    const item = await Cart.create(req.body)
    res.status(200).json(item)

})

const removeProductToCart = asyncHandler(async(req,res)=>{

    const id = req.params.id;
    const item = await Cart.findByIdAndDelete(id)
    res.status(200).json(item)

})

const updateProductToCart = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    const item = await Cart.findOneAndUpdate({product_id : id},req.body,{new : true})
    res.status(200).json(item)

})


module.exports = {
    addProductToCart,
    removeProductToCart,
    updateProductToCart,
}