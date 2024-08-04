const User = require('../models/User');
const bcrypt = require('bcrypt');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase.auth.signUp({
        email,
        password
    });

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully', user: data.user });
};


exports.login = async (req, res) => {
    const { email, password } = req.body;

    const { user, error } = await supabase.auth.signIn({
        email,
        password
    });

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    const mongoUser = await User.findOne({ email });
    if (!mongoUser) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'Login successful', user });
};
