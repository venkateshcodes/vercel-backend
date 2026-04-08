const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Helper function to read JSON files
const readJSONFile = (filename) => {
    try {
        const filePath = path.join(__dirname, '../../frontend/data', filename);
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(data);
        }
        return [];
    } catch (error) {
        console.error(`Error reading ${filename}:`, error);
        return [];
    }
};

router.get('/schedule', (req, res) => {
    const schedule = readJSONFile('schedule.json');
    res.json({ success: true, data: schedule });
});

router.get('/speakers', (req, res) => {
    const speakers = readJSONFile('speakers.json');
    res.json({ success: true, data: speakers });
});

router.get('/committees', (req, res) => {
    const committees = readJSONFile('committees.json');
    res.json({ success: true, data: committees });
});

module.exports = router;