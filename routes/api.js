// routes/api.js

const express = require('express');
const router = express.Router();
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const verifyToken = require('./authMiddleware');
// test
router.get('/hello', (req, res) => {
    res.json({ message: 'Hello from the API!' });
});

// cree compte
router.post('/users', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
//login
router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check if the password is correct
        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, 'yosri', { expiresIn: '1h' });

        // Send token in response
        res.json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
//test jwt
router.get('/protected-route', verifyToken, (req, res) => {
    // If the token is valid, req.userId will be set to the user's ID
    // You can use req.userId to perform actions on behalf of the authenticated user
    res.json({ message: 'Protected route accessed' });
});
module.exports = router;
