const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');

// Criar um transporter usando as credenciais do Mailtrap
const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525, // ou 465, 587, 25 dependendo da sua configuração
    auth: {
        user: '3c9cdb5096ceba',  // Seu nome de usuário do Mailtrap
        pass: '14f03fa3854f15'   // Sua senha do Mailtrap
    }
});

exports.register = async (req, res) => {
    // Implementação do controlador de registro
};

exports.login = async (req, res) => {
    // Implementação do controlador de login
};

exports.recover = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(400).json({ msg: 'Usuário não encontrado' });
        }

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        const mailOptions = {
            from: 'seu-email@dominio.com',       // Seu endereço de e-mail
            to: user.email,                      // Endereço do destinatário
            subject: 'Recuperação de Senha - TeamStudy', // Assunto do e-mail
            text: `Você solicitou a recuperação de senha. Clique no link abaixo para redefinir sua senha:\n\nhttp://localhost:3000/resetar-senha?token=${token}` // Corpo do e-mail
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