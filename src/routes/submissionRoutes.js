const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { 
    createSubmission, 
    getMySubmissions, 
    getSubmissionById 
} = require('../controllers/submissionController');
const upload = require('../middleware/upload');

// All routes require authentication
router.use(protect);

router.post('/', upload.single('paper'), createSubmission);
router.get('/', getMySubmissions);
router.get('/:id', getSubmissionById);

module.exports = router;