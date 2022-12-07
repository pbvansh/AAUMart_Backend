
const asyncHandler = require('express-async-handler');
const Cart = require('../model/cartModel');
const Payment = require('../model/paymentModal')
const Order_item = require('../model/order_itemsModel')
require('dotenv').config()
const crypto = require('crypto')
const Razorpey = require('razorpay')

const Instance = new Razorpey({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET
})

const placeOrder = asyncHandler(async (req, res) => {
    const { products, user_id } = req.body;
    const item = await Cart.find({ user_id, isOrdered: false }).populate('product_id');
    let total = 0;
    for (let i = 0; i < item.length; i++) {
        let sum = Number(item[i].quantity) * Number(item[i].product_id.price)
        total += sum;
    }
    if (products) {
        const options = {
            amount: Number(total * 100),
            currency: "INR"
        }

        const razorOrder = await Instance.orders.create(options);

        res.status(200).json({ msg: "order was successfully", razorOrder })

    } else {
        res.status(400).json({ "msg": "please provide product info" })
    }

})

//payment verification 
const paymentVerification = asyncHandler(async (req, res) => {
    const user_id = req.params.id;
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET)
        .update(body.toString())
        .digest('hex');
    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
        // data base come here  && store payment info to database
        const payment = await Payment.create({

            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        })

        //place order && store data in order table
        const cartItems = await Cart.find({ user_id, isOrdered: false }).populate('product_id');
        const orderItem = cartItems.map((item) => {
            return {
                id: item.product_id._id,
                quantity: item.quantity
            }
        })

        let total = 0;
        for (let i = 0; i < cartItems.length; i++) {
            let sum = Number(cartItems[i].quantity) * Number(cartItems[i].product_id.price)
            total += sum;
        }
        if (cartItems.length > 0) {
            const order = await Order_item.create({
                user_id,
                total,
                products: orderItem
            })
            await Cart.updateMany({ isOrdered: false }, { isOrdered: true }, { new: true })

        }

        res.redirect('http://localhost:3000/success?payment_id=' + razorpay_payment_id)

    } else {

        res.status(400).json({ success: false })
    }

})

const addUserToPayment = asyncHandler(async (req, res) => {
    const PaymentId = req.params.id;
    const user_id = req.user.userId;

    const payment = await Payment.findOneAndUpdate({ razorpay_payment_id: PaymentId }, { user_id }, { new: true })
    res.status(200).json(payment)
})

const getAllProducts = asyncHandler(async (req, res) => {
    const user_id = req.user.userId;
    const orders = await Order_item.find({ user_id }).populate("products.id")
    res.status(200).json(orders)
})

module.exports = {
    placeOrder,
    paymentVerification,
    addUserToPayment,
    getAllProducts
}