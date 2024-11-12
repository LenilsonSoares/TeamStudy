const { validationResult } = require('express-validator');
const User = require('../models/User');

// Função para obter os dados do usuário logado
exports.getMe = async (req, res, next) => {
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.json(user);
    } catch (err) {
        next(err);
    }
};

// Função para excluir o usuário logado
exports.deleteMe = async (req, res, next) => {
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        await User.delete(userId);

        res.json({ msg: 'Usuário excluído com sucesso' });
    } catch (err) {
        next(err);
    }
};

// Função para buscar todos os usuários
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        next(err);
    }
};