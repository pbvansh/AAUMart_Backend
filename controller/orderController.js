
const asyncHandler = require('express-async-handler');
const Order = require('../model/order_itemsModel')
const stripe = require('stripe')('sk_test_51LrwuaSETLFq9Kvw0OskKrHyFUaHsHnV0StiHYZVye3TCH4Iwq98lxQg8INATPwp4pSYaGmMxX9sVWFMiDufddwq00XbAxNuNb')
const { v4 } = require('uuid');
const Cart = require('../model/cartModel');

const placeOrder = asyncHandler(async (req, res) => {
    const { products, quantity, paymentInfo } = req.body;
    if (products) {
        const item = await Cart.find({ user_id: req.user.id }).populate('product_id');
        let total = 0;
        for (let i = 0; i < item.length; i++) {
            let sum = Number(item[i].quantity) * Number(item[i].product_id.price)
            total += sum;
        }

        const preCostomer = stripe.customers.list({
            email: req.user.userEmail
        })
        console.log(preCostomer);
        const isExistingCustomer = preCostomer ? preCostomer.data.length >=1 : false;
        let newCustomer;
        if (!isExistingCustomer) {
            newCustomer = await stripe.customers.create({
                email: req.user.userEmail,
                source: paymentInfo.id
            })
        }

        const charge = await stripe.charges.create({
            amount: total * 100,
            currency: 'INR',
            receipt_email: paymentInfo.email,
            customer: isExistingCustomer ? preCostomer.data[0].id : newCustomer.id,
            description: `My First Test Charge | ${req.user.userEmail}`,

        }, {
            idempotencyKey: v4()
        })

        const order = await Order.create(req.body)
        res.status(200).json({ order, msg: "payment was successfully",charge })

    } else {
        res.status(400).json({ "msg": "please provide product info" })
    }

})

module.exports = {
    placeOrder,
}