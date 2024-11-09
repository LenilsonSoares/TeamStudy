const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const User = require('../models/User');

exports.updateProfile = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nome, nome_usuario, email, senha, avatar } = req.body;
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: 'Usuário não encontrado' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = senha ? await bcrypt.hash(senha, salt) : user.senha;

        await User.update(userId, nome, nome_usuario, email, hashedPassword, avatar);

        res.json({ msg: 'Perfil atualizado com sucesso' });
    } catch (error) {
        console.error('Erro no servidor:', error.message);
        res.status(500).send('Erro no servidor');
    }
};

exports.getMe = async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.json(user);
    } catch (err) {
        console.error('Erro ao buscar usuário:', err);
        res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
};

exports.getProfile = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.json(user);
    } catch (err) {
        console.error('Erro ao buscar usuário:', err);
        res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
};

exports.createProfile = async (req, res) => {
    const { nome, nome_usuario, email, senha, avatar } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(senha, salt);

        const user = await User.create(nome, nome_usuario, email, hashedPassword, avatar);

        res.status(201).json({ msg: 'Perfil criado com sucesso', user });
    } catch (err) {
        console.error('Erro ao criar perfil:', err.message);
        res.status(500).json({ error: 'Erro ao criar perfil' });
    }
};

exports.deleteProfile = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: 'Usuário não encontrado' });
        }

        await User.delete(userId);

        res.json({ msg: 'Perfil deletado com sucesso' });
    } catch (err) {
        console.error('Erro ao deletar perfil:', err.message);
        res.status(500).json({ error: 'Erro ao deletar perfil' });
    }
};