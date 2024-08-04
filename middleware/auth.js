const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();


const auth = (roles = []) => {
    return async (req, res, next) => {
        try {
            if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
                return res.status(401).send('Unauthorized: No token provided');
            }

            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEYK);

            const user = await User.findById(decoded.userId);
            if (!user) {
                return res.status(401).send('Unauthorized: User not found');
            }

            if (roles.length && !roles.includes(user.role)) {
                return res.status(403).send('Access denied: Insufficient role');
            }

            req.user = user;
            next();
        } catch (error) {
            console.error('Authentication error:', error);
            res.status(401).send('Unauthorized');
        }
    };
};

module.exports = auth;
