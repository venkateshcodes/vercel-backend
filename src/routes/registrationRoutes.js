const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { 
    createRegistration, 
    getMyRegistration, 
    updatePayment 
} = require('../controllers/registrationController');

// All routes require authentication
router.use(protect);

router.post('/', createRegistration);
router.get('/', getMyRegistration);
router.put('/payment', updatePayment);

module.exports = router;