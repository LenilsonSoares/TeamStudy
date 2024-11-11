const bcrypt = require('bcrypt'); // Importa a biblioteca bcrypt para criptografia de senhas
const jwt = require('jsonwebtoken'); // Importa a biblioteca jsonwebtoken para criação e verificação de tokens JWT
const User = require('../models/User'); // Importa o modelo User para interagir com a tabela de usuários no banco de dados
const { connectDB } = require('../config/db'); // Importa a função connectDB para conectar ao banco de dados
const nodemailer = require('nodemailer'); // Importa a biblioteca nodemailer para envio de e-mails

// Cria um transporter usando as credenciais do Mailtrap
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, // Host do servidor de e-mail
    port: process.env.EMAIL_PORT, // Porta do servidor de e-mail
    auth: {
        user: process.env.EMAIL_USER,  // Nome de usuário do Mailtrap
        pass: process.env.EMAIL_PASS   // Senha do Mailtrap
    }
});

// Função para registrar um novo usuário
exports.register = async (req, res) => {
    const { email, nome_usuario, senha } = req.body; // Extrai email, nome de usuário e senha do corpo da requisição

    try {
        const db = await connectDB(); // Conecta ao banco de dados
        let user = await User.findByEmail(email, db); // Verifica se o usuário já existe no banco de dados
        if (user) {
            return res.status(400).json({ msg: 'Usuário já existe' }); // Retorna erro se o usuário já existe
        }

        const salt = await bcrypt.genSalt(10); // Gera um salt para a criptografia da senha
        const hashedPassword = await bcrypt.hash(senha, salt); // Criptografa a senha

        user = await User.create(nome_usuario, nome_usuario, email, hashedPassword, '', db); // Cria um novo usuário no banco de dados

        const payload = {
            user: {
                id: user.insertId // Define o payload do token JWT com o ID do usuário
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET, // Chave secreta para assinar o token JWT
            { expiresIn: '1h' }, // Define o tempo de expiração do token
            (err, token) => {
                if (err) throw err; // Lança um erro se ocorrer algum problema ao assinar o token
                res.status(201).json({ token }); // Retorna o token JWT no corpo da resposta
            }
        );
    } catch (err) {
        console.error('Erro ao registrar usuário:', err.message); // Loga o erro no console
        res.status(500).send('Erro no servidor'); // Retorna erro 500 se ocorrer algum problema no servidor
    }
};

// Função para fazer login de um usuário
exports.login = async (req, res) => {
    const { email, senha } = req.body; // Extrai email e senha do corpo da requisição

    try {
        const db = await connectDB(); // Conecta ao banco de dados
        const user = await User.findByEmail(email, db); // Verifica se o usuário existe no banco de dados
        if (!user) {
            return res.status(400).json({ msg: 'Usuário não encontrado' }); // Retorna erro se o usuário não for encontrado
        }

        const isMatch = await bcrypt.compare(senha, user.senha); // Compara a senha fornecida com a senha criptografada no banco de dados
        if (!isMatch) {
            return res.status(400).json({ msg: 'Senha incorreta' }); // Retorna erro se a senha estiver incorreta
        }

        const payload = {
            user: {
                id: user.id // Define o payload do token JWT com o ID do usuário
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET, // Chave secreta para assinar o token JWT
            { expiresIn: '1h' }, // Define o tempo de expiração do token
            (err, token) => {
                if (err) throw err; // Lança um erro se ocorrer algum problema ao assinar o token
                res.json({ token }); // Retorna o token JWT no corpo da resposta
            }
        );
    } catch (err) {
        console.error('Erro ao fazer login:', err.message); // Loga o erro no console
        res.status(500).send('Erro no servidor'); // Retorna erro 500 se ocorrer algum problema no servidor
    }
};

// Função para recuperar a senha de um usuário
exports.recover = async (req, res) => {
    const { email } = req.body; // Extrai o email do corpo da requisição

    try {
        const db = await connectDB(); // Conecta ao banco de dados
        const user = await User.findByEmail(email, db); // Verifica se o usuário existe no banco de dados
        if (!user) {
            return res.status(400).json({ msg: 'Usuário não encontrado' }); // Retorna erro se o usuário não for encontrado
        }

        const token = jwt.sign(
            { id: user.id }, // Define o payload do token JWT com o ID do usuário
            process.env.JWT_SECRET, // Chave secreta para assinar o token JWT
            { expiresIn: '1h' } // Define o tempo de expiração do token
        );

        const mailOptions = {
            from: process.env.EMAIL_USER,       // Endereço de e-mail do remetente
            to: user.email,                      // Endereço de e-mail do destinatário
            subject: 'Recuperação de Senha - TeamStudy', // Assunto do e-mail
            text: `Você solicitou a recuperação de senha. Clique no link abaixo para redefinir sua senha:\n\nhttp://localhost:3000/resetar-senha?token=${token}` // Corpo do e-mail
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Erro ao enviar e-mail:', error); // Loga o erro no console
                return res.status(500).json({ msg: 'Erro ao enviar e-mail', error: error.message }); // Retorna erro 500 se ocorrer algum problema ao enviar o e-mail
            }
            res.status(200).json({ msg: 'E-mail de recuperação enviado com sucesso' }); // Retorna sucesso se o e-mail for enviado corretamente
        });
    } catch (err) {
        console.error('Erro ao recuperar senha:', err.message); // Loga o erro no console
        res.status(500).json({ msg: 'Erro no servidor', error: err.message }); // Retorna erro 500 se ocorrer algum problema no servidor
    }
};