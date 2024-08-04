
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const supabase = require('../supaBaseClient');
const Session = require('../models/Session');
const router = express.Router();
require('dotenv').config();



router.post('/register', async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const { user, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.log(res)
        res.status(400).json({ error: error.message });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);

        const { user, session, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        const mongoUser = await User.findOne({ email });

        if (!mongoUser) {
            return res.status(400).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, mongoUser.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: mongoUser._id, role: mongoUser.role }, process.env.JWT_SECRET_KEYK);
        const sessionData = new Session({
            userId: mongoUser._id,
            ipAddress: req.ip 
        });
        await sessionData.save();
        
        res.json({token: token ,role: mongoUser.role});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


module.exports = router;
