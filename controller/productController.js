const asyncHandler = require('express-async-handler')
const Product = require('../model/productModel')

const getAllProducts = asyncHandler(async (req, res) => {
  let queries = [];
  const { Min, Max, category, name } = req.query;

  if (category != undefined && category !== 'all') {
    queries.push({ category })
  } else queries.push({})

  if (name !== undefined) {
    queries.push({ name })
  } else queries.push({})

  if (Min !== undefined && Max !== undefined) {
    queries.push({ "price": { $gte: Number(Min), $lte: Number(Max) } })
  }

  const products = await Product.find({ "$and": queries });
  res.status(200).json(products)
})

const getStaticProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  res.status(200).json(product)
})

const addProduct = asyncHandler(async (req, res) => {
  const { name, desc, category, price } = req.body;
  const product = await Product.create({ name, desc, category, price })
  console.log('addProduct');
  res.status(200).json(product)
})

const addImgUrl = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findByIdAndUpdate(id, req.body, { new: true })
  res.status(200).json(product)
})

const updateProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findByIdAndUpdate(id, req.body, { new: true })
  res.status(200).json(product);
})

const deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  await Product.findByIdAndDelete(id)
  res.status(200).json({ msg: "prodicu deleted successfuly" });
})

module.exports = {
  getAllProducts,
  getStaticProduct,
  addProduct,
  addImgUrl,
  updateProduct,
  deleteProduct
}