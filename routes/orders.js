const express = require('express');
const mongoose = require('mongoose');
const Order = require('../models/Order');
const Ecommerce = require('../models/Product');
const auth = require('../middleware/auth');
const router = express.Router();


router.post('/', auth(), async (req, res) => {
    try {
        const { products } = req.body;
        let totalAmount = 0;
        const orderProducts = [];

        
        const ecommerce = await Ecommerce.findOne();
        if (!ecommerce) {
            return res.status(404).send('Ecommerce document not found');
        }

        for (const item of products) {
            const { category: categoryName, id, quantity } = item;
            const productId = id.toString();

            
            const category = ecommerce.categories.find(cat => cat.name === categoryName);
            console.log(category)
            if (!category) {
                return res.status(404).send(`Category ${categoryName} not found`);
            }

            
            const product = category.products.find(prod => prod.id.toString() === productId);
            if (!product) {
                return res.status(404).send(`Product with ID ${id} not found in category ${categoryName}`);
            }

            
            orderProducts.push({
                productId: productId, 
                name: product.name,
                weight: product.weight,
                price: parseFloat(product.price.replace('₹', '')),
                quantity: quantity,
                image: product.image
            });


            totalAmount += parseFloat(product.price.replace('₹', '')) * quantity;
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
