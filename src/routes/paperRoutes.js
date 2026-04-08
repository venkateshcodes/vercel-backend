const router = require('express').Router();
const { uploadPaper, getPapers } = require('../controllers/paperController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/upload', protect, upload.single('file'), uploadPaper);
router.get('/', getPapers);

module.exports = router;