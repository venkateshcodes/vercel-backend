const router = require('express').Router();

const {
  getUsers,
  makeAdmin,
  getAllPapers,
  deletePaper,
  getStats
} = require('../controllers/adminController');

const { protect } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/roleMiddleware');

// 🔒 Apply middleware to ALL routes
router.use(protect, isAdmin);

// ROUTES
router.get('/users', getUsers);
router.put('/make-admin/:id', makeAdmin);
router.get('/papers', getAllPapers);
router.delete('/papers/:id', deletePaper);
router.get('/stats', getStats);

module.exports = router;