const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/me', authMiddleware, userController.getMe);
router.delete('/me', authMiddleware, userController.deleteMe);
router.get('/', authMiddleware, userController.getAllUsers); // Adicione esta linha

module.exports = router;