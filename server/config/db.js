const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10, // Ajuste conforme necessário
    queueLimit: 0,
    charset: 'utf8mb4'
});

const connectDB = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Conectado ao banco de dados MySQL');
        return connection;
    } catch (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        throw err;
    }
};

const closeAllConnections = async () => {
    try {
        await pool.end();
        console.log('Todas as conexões ao banco de dados foram encerradas');
    } catch (err) {
        console.error('Erro ao encerrar conexões ao banco de dados:', err);
    }
};

module.exports = { connectDB, closeAllConnections };