const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/recover', authController.recover); // Certifique-se de que o controlador 'recover' está definido

module.exports = router;