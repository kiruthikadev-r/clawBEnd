const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const authRoutes = require('./routes/register');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const sessionRoutes = require('./routes/sessions');
const authMiddleware = require('./middleware/auth');
const paymentRoutes = require('./routes/payment');
const orderRoutes = require('./routes/orders');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;


connectDB();


app.use(express.json());


const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 
};
app.use(cors(corsOptions));

// Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/sessions', sessionRoutes);
app.use('/payment', paymentRoutes);
app.use('/orders', orderRoutes);


app.get('/admin', authMiddleware(['admin']), (req, res) => {
    res.send('Admin Access Granted');
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
