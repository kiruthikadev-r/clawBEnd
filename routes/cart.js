const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const router = express.Router();


let cart = {};


router.post('/', auth(), async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    if (!cart[userId]) {
        cart[userId] = [];
    }

    const existingItemIndex = cart[userId].findIndex(item => item.productId === productId);

    if (existingItemIndex >= 0) {
        
        cart[userId][existingItemIndex].quantity += quantity;
    } else {
    
        cart[userId].push({ productId, quantity });
    }

    res.status(201).send(cart[userId]);
});


router.get('/', auth(), async (req, res) => {
    const userId = req.user._id;
    res.send(cart[userId] || []);
});

router.post('/orders', auth(), async (req, res) => {
    try {
        const { products } = req.body;
        let totalAmount = 0;
        console.log(products);

        const orderProducts = [];

        for (const item of products) {
            
            const product = await Product.findById(item.id);
            if (!product) {
                return res.status(404).send(`Product with ID ${item.id} not found`);
            }

            
            orderProducts.push({
                productId: item.id, 
                name: item.name,
                weight: item.weight,
                price: parseFloat(item.price.replace('₹', '')),
                quantity: item.quantity,
                image: item.image
            });

            
            totalAmount += parseFloat(item.price.replace('₹', '')) * item.quantity;
        }


        const order = new Order({
            userId: req.user._id,
            products: orderProducts,
            totalAmount,
        });

        await order.save();

        res.status(201).send(order);
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).send(error.message);
    }
});

router.get('/orders', auth(), async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id });
        res.send(orders);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
