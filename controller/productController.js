const asyncHandler = require('express-async-handler')
const Product = require('../model/productModel')

const getAllProducts = asyncHandler(async (req, res) => {
    let products = await Product.find();
    res.status(200).json(products)
})

const getStaticProduct = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    const product = await Product.findById(id);
    res.status(200).json(product)
})

const addProduct = asyncHandler(async (req, res) => {
    console.log(req.user);
    console.log(req.body);
    const {name,desc,category,price} = req.body;
    const product = await Product.create({name,desc,category,price})
    console.log('addProduct');
    res.status(200).json(product)
})

const addImgUrl = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true })
    res.status(200).json(product)
})

module.exports = {
    getAllProducts,
    getStaticProduct,
    addProduct,
    addImgUrl
}