const express = require('express');
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/me', authMiddleware, profileController.getProfile);
router.put('/', authMiddleware, profileController.updateProfile);

module.exports = router;