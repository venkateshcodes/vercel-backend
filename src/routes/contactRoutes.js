const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.post('/', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        const contact = await Contact.create({
            name,
            email,
            subject: subject || 'General Inquiry',
            message
        });
        
        res.status(201).json({ 
            success: true, 
            message: 'Message sent successfully!' 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;