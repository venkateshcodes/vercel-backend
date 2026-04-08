const Registration = require('../models/Registration');

// @desc    Create registration
// @route   POST /api/registration
exports.createRegistration = async (req, res) => {
    try {
        const { category, institution, country, phoneNumber } = req.body;
        const userId = req.user.id;

        // Check if already registered
        const existingReg = await Registration.findOne({ userId });
        if (existingReg) {
            return res.status(400).json({ 
                success: false, 
                message: 'You are already registered for this conference' 
            });
        }

        // Create registration
        const registration = await Registration.create({
            userId,
            category,
            institution,
            country,
            phoneNumber
        });

        res.status(201).json({
            success: true,
            message: 'Registration successful!',
            data: registration
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get user registration
// @route   GET /api/registration
exports.getMyRegistration = async (req, res) => {
    try {
        const registration = await Registration.findOne({ userId: req.user.id });
        if (!registration) {
            return res.status(404).json({ 
                success: false, 
                message: 'No registration found' 
            });
        }
        res.json({ success: true, data: registration });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update payment status
// @route   PUT /api/registration/payment
exports.updatePayment = async (req, res) => {
    try {
        const registration = await Registration.findOneAndUpdate(
            { userId: req.user.id },
            { paymentStatus: 'completed', attendanceStatus: 'confirmed' },
            { new: true }
        );
        
        if (!registration) {
            return res.status(404).json({ 
                success: false, 
                message: 'Registration not found' 
            });
        }
        
        res.json({ 
            success: true, 
            message: 'Payment updated successfully!', 
            data: registration 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};