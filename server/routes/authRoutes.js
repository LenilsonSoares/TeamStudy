const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const router = express.Router();

router.post(
    '/register',
    [
        check('nome', 'Nome é obrigatório').not().isEmpty(),
        check('nome_usuario', 'Nome de usuário é obrigatório').not().isEmpty(),
        check('email', 'Por favor, inclua um email válido').isEmail(),
        check('senha', 'A senha deve ter 6 ou mais caracteres').isLength({ min: 6 }),
    ],
    authController.register
);

router.post(
    '/login',
    [
        check('email', 'Por favor, inclua um email válido').isEmail(),
        check('senha', 'Senha é obrigatória').exists(),
    ],
    authController.login
);

module.exports = router;