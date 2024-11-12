const { connectDB } = require('../config/db');

const User = {
    create: async (nome, nome_usuario, email, senha, avatar) => {
        const db = await connectDB();
        try {
            const query = 'INSERT INTO Usuarios (nome, nome_usuario, email, senha, avatar) VALUES (?, ?, ?, ?, ?)';
            const [results] = await db.execute(query, [nome, nome_usuario, email, senha, avatar]);
            return results;
        } finally {
            db.release(); // Libera a conexão após a execução
        }
    },
    findByEmail: async (email) => {
        const db = await connectDB();
        try {
            const query = 'SELECT * FROM Usuarios WHERE email = ?';
            const [results] = await db.execute(query, [email]);
            return results[0];
        } finally {
            db.release();
        }
    },
    findById: async (id) => {
        const db = await connectDB();
        try {
            const query = 'SELECT * FROM Usuarios WHERE id = ?';
            const [results] = await db.execute(query, [id]);
            return results[0];
        } finally {
            db.release();
        }
    },
    update: async (id, nome, nome_usuario, email, senha, avatar) => {
        const db = await connectDB();
        try {
            const query = 'UPDATE Usuarios SET nome = ?, nome_usuario = ?, email = ?, senha = ?, avatar = ? WHERE id = ?';
            const [results] = await db.execute(query, [nome, nome_usuario, email, senha, avatar, id]);
            return results;
        } finally {
            db.release();
        }
    },
    delete: async (id) => {
        const db = await connectDB();
        try {
            const query = 'DELETE FROM Usuarios WHERE id = ?';
            const [results] = await db.execute(query, [id]);
            return results;
        } finally {
            db.release();
        }
    },
    findAll: async () => {
        const db = await connectDB();
        try {
            const query = 'SELECT * FROM Usuarios';
            const [results] = await db.execute(query);
            return results;
        } finally {
            db.release();
        }
    }
};

module.exports = User;