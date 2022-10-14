
const asyncHandler = require('express-async-handler');
const Order = require('../model/order_itemsModel')
const { v4 } = require('uuid');
const Cart = require('../model/cartModel');
const Payment = require('../model/paymentModal')
require('dotenv').config()
const crypto = require('crypto')
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
    
        res.status(200).json({msg: "order was successfully" , razorOrder})

    } else {
        res.status(400).json({ "msg": "please provide product info" })
    }

})


const paymentVerification = asyncHandler(async(req,res)=>{
    const { razorpay_payment_id , razorpay_order_id , razorpay_signature } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET)
                                    .update(body.toString())
                                    .digest('hex');
    const isAuthentic = expectedSignature ===razorpay_signature;

    if(isAuthentic){
            // data base come here

        const payment = await Payment.create({
            razorpay_order_id ,
            razorpay_payment_id ,
            razorpay_signature  
        })
        res.redirect('http://localhost:3000/success?payment_id='+razorpay_payment_id)

    }else{

        res.status(400).json({success : false})
    }

})

module.exports = {
    placeOrder,
    paymentVerification
}