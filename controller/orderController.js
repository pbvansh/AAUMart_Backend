
const asyncHandler = require('express-async-handler');
const Order = require('../model/order_itemsModel')
const { v4 } = require('uuid');
const Cart = require('../model/cartModel');
require('dotenv').config()
const Razorpey = require('razorpay')

const Instance = new Razorpey({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET
})

const placeOrder = asyncHandler(async (req, res) => {
    const { products, user_id } = req.body;
    if (products) {
        const item = await Cart.find({ user_id }).populate('product_id');
        let total = 0;
        for (let i = 0; i < item.length; i++) {
            let sum = Number(item[i].quantity) * Number(item[i].product_id.price)
            total += sum;
        }

        const options = { 
            amount : Number(total * 100),
            currency : "INR"
        }

        const razorOrder = await Instance.orders.create(options);
        console.log(razorOrder);

        // const order = await Order.create(req.body)
        res.status(200).json({msg: "order was successfully" , razorOrder})

    } else {
        res.status(400).json({ "msg": "please provide product info" })
    }

})


const paymentVerification = asyncHandler(async(req,res)=>{
    console.log(req.body);
    res.redirect('https://AAUMartBackend.pratikvansh.repl.co/success')
    // res.status(200).json({success : true})

})

module.exports = {
    placeOrder,
    paymentVerification
}