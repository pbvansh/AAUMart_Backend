const asyncHandler = require('express-async-handler')
const Category = require('../model/categoryModel')

const getAllCat = asyncHandler(async (req, res) => {
    const cat = await Category.find().select('name')
    res.status(200).json(cat)
})

const addCategory = asyncHandler(async (req, res) => {
    const cat = await Category.create(req.body)
    res.status(200).json(cat)
})

const deleteCategory = asyncHandler(async (req, res) => {
    const id = req.params.id;
    await Category.findByIdAndDelete(id);
    res.status(200).json({ msg: 'Catogory deleted successful' });
})

module.exports = {
    getAllCat,
    addCategory,
    deleteCategory,
}