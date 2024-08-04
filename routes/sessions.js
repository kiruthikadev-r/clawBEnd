const express = require('express');
const Session = require('../models/Session');
const auth = require('../middleware/auth');
const router = express.Router();


router.get('/', auth(['admin']), async (req, res) => {
    try {
        const sessions = await Session.find();
        res.send(sessions);
    } catch (error) {
        res.status(400).send(error.message);
    }
});


router.post('/', auth(), async (req, res) => {
    try {
        const { userId, ipAddress } = req.body; 

        const newSession = new Session({
            userId,
            ipAddress,
        });

        await newSession.save();
        res.status(201).send(newSession);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
