const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/me', authMiddleware, userController.getMe);
router.delete('/me', authMiddleware, userController.deleteMe);
router.get('/', authMiddleware, userController.getAllUsers); // Adicionada a rota para obter todos os usuários

module.exports = router;