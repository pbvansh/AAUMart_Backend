const asyncHandler = require('express-async-handler')
const Product = require('../model/productModel')
const Category = require('../model/categoryModel')

const getAllProducts = asyncHandler(async (req, res) => {
    let products = await Product.find()

    // var resources = {
    //     name: "$name",
    //     desc: "$desc",
    //     price: '$price',
    //     img_url: '$img_url'
    // };

    // const products = await Product.aggregate([{
    //     $group: resources
    // }, {
    //     $lookup: {
    //         from: Category,
    //         localField: '_id',
    //         foreignField: 'category_id',
    //         as: 'name',
    //     }
    // }
    // ], function (error, data) {
    //     if(error){
    //         console.log(error);
    //     }else{
    //         return res.json(data);
    //     }
    //     //handle error case also
    // })


    res.status(200).json(products)
})

const getStaticProduct = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    const product = await Product.findById(id);
    res.status(200).json(product)
})

const addProduct = asyncHandler(async (req, res) => {
    // const cat = await Category.findOne({name:req.body.category_id})
    // req.body.category_id = cat._id;
    const product = await Product.create(req.body)
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