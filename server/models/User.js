const connectDB = require('../config/db');

const User = {
    create: async (nome, nome_usuario, email, senha, avatar) => {
        const db = await connectDB();
        const query = 'INSERT INTO Usuarios (nome, nome_usuario, email, senha, avatar) VALUES (?, ?, ?, ?, ?)';
        const [results] = await db.execute(query, [nome, nome_usuario, email, senha, avatar]);
        return results;
    },
    findByEmail: async (email) => {
        const db = await connectDB();
        const query = 'SELECT * FROM Usuarios WHERE email = ?';
        const [results] = await db.execute(query, [email]);
        return results[0];
    },
    findById: async (id) => {
        const db = await connectDB();
        const query = 'SELECT * FROM Usuarios WHERE id = ?';
        const [results] = await db.execute(query, [id]);
        return results[0];
    },
    update: async (id, nome, nome_usuario, email, senha, avatar) => {
        const db = await connectDB();
        const query = 'UPDATE Usuarios SET nome = ?, nome_usuario = ?, email = ?, senha = ?, avatar = ? WHERE id = ?';
        const [results] = await db.execute(query, [nome, nome_usuario, email, senha, avatar, id]);
        return results;
    },
    delete: async (id) => {
        const db = await connectDB();
        const query = 'DELETE FROM Usuarios WHERE id = ?';
        const [results] = await db.execute(query, [id]);
        return results;
    },
    findAll: async () => {
        const db = await connectDB();
        const query = 'SELECT * FROM Usuarios';
        const [results] = await db.execute(query);
        return results;
    }
};

module.exports = User;