const express = require('express');
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.put('/', authMiddleware, profileController.updateProfile);
router.get('/me', authMiddleware, profileController.getMe);

module.exports = router;