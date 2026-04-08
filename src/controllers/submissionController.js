const Submission = require('../models/Submission');
const path = require('path');
const fs = require('fs');

// @desc    Create submission
// @route   POST /api/submission
exports.createSubmission = async (req, res) => {
    try {
        const { title, abstract, keywords, track, presentationType, comments, authors } = req.body;
        const userId = req.user.id;

        // Validate file
        if (!req.file) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please upload a paper file' 
            });
        }

        // Parse authors if sent as JSON string
        let authorsArray = [];
        if (authors) {
            try {
                authorsArray = JSON.parse(authors);
            } catch (e) {
                authorsArray = [];
            }
        }

        // Create submission
        const submission = await Submission.create({
            userId,
            title,
            abstract,
            keywords: keywords ? keywords.split(',').map(k => k.trim()) : [],
            track: track || 'general',
            presentationType: presentationType || 'oral',
            comments: comments || '',
            authors: authorsArray,
            fileUrl: req.file.path,
            fileName: req.file.originalname,
            status: 'pending'
        });

        res.status(201).json({
            success: true,
            message: 'Paper submitted successfully!',
            data: submission
        });

    } catch (error) {
        console.error('Submission error:', error);
        // Delete uploaded file if submission fails
        if (req.file && req.file.path) {
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Error deleting file:', err);
            });
        }
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get user submissions
// @route   GET /api/submission
exports.getMySubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find({ userId: req.user.id })
            .sort({ submittedAt: -1 });
        res.json({ success: true, data: submissions });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single submission
// @route   GET /api/submission/:id
exports.getSubmissionById = async (req, res) => {
    try {
        const submission = await Submission.findById(req.params.id);
        if (!submission) {
            return res.status(404).json({ 
                success: false, 
                message: 'Submission not found' 
            });
        }
        
        // Check if user owns this submission or is admin
        if (submission.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ 
                success: false, 
                message: 'Access denied' 
            });
        }
        
        res.json({ success: true, data: submission });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};