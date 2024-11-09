const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

// Gere um token de autenticação para os testes
const token = jwt.sign(
    { user: { id: 1 } }, // Substitua pelo ID do usuário de teste
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
);

module.exports = token;