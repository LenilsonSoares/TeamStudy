const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { connectDB } = require('../config/db');
const nodemailer = require('nodemailer');

// Configuração do transporter para envio de e-mails
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Função para registrar um novo usuário
exports.register = async (req, res) => {
    const { email, nome_usuario, senha } = req.body;

    try {
        const db = await connectDB();
        let user = await User.findByEmail(email, db);
        if (user) {
            return res.status(400).json({ msg: 'Usuário já existe' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(senha, salt);

        user = await User.create(nome_usuario, nome_usuario, email, hashedPassword, '', db);

        const payload = { user: { id: user.insertId } };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.status(201).json({ token });
        });
    } catch (err) {
        console.error('Erro ao registrar usuário:', err.message);
        res.status(500).send('Erro no servidor');
    }
};

// Função para fazer login de um usuário
exports.login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const db = await connectDB();
        const user = await User.findByEmail(email, db);
        if (!user) {
            return res.status(400).json({ msg: 'Usuário não encontrado' });
        }

        const isMatch = await bcrypt.compare(senha, user.senha);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Senha incorreta' });
        }

        const payload = { user: { id: user.id } };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error('Erro ao fazer login:', err.message);
        res.status(500).send('Erro no servidor');
    }
};

// Função para recuperar a senha de um usuário
exports.recover = async (req, res) => {
    const { email } = req.body;

    try {
        const db = await connectDB();
        const user = await User.findByEmail(email, db);
        if (!user) {
            return res.status(400).json({ msg: 'Usuário não encontrado' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Recuperação de Senha - TeamStudy',
            text: `Você solicitou a recuperação de senha. Clique no link abaixo para redefinir sua senha:\n\nhttp://localhost:3000/resetar-senha?token=${token}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Erro ao enviar e-mail:', error);
                return res.status(500).json({ msg: 'Erro ao enviar e-mail', error: error.message });
            }
            res.status(200).json({ msg: 'E-mail de recuperação enviado com sucesso' });
        });
    } catch (err) {
        console.error('Erro ao recuperar senha:', err.message);
        res.status(500).json({ msg: 'Erro no servidor', error: err.message });
    }
};