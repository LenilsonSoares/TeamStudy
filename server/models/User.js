const { connectDB } = require('../config/db');

const User = {
    create: async (nome, nome_usuario, email, senha, avatar) => {
        const db = await connectDB();
        const query = 'INSERT INTO Usuarios (nome, nome_usuario, email, senha, avatar) VALUES (?, ?, ?, ?, ?)';
        const [results] = await db.execute(query, [nome, nome_usuario, email, senha, avatar]);
        db.release(); // Liberar a conexão de volta para o pool
        return results;
    },
    findByEmail: async (email) => {
        const db = await connectDB();
        const query = 'SELECT * FROM Usuarios WHERE email = ?';
        const [results] = await db.execute(query, [email]);
        db.release(); // Liberar a conexão de volta para o pool
        return results[0];
    },
    findById: async (id) => {
        const db = await connectDB();
        const query = 'SELECT * FROM Usuarios WHERE id = ?';
        const [results] = await db.execute(query, [id]);
        db.release(); // Liberar a conexão de volta para o pool
        return results[0];
    },
    update: async (id, nome, nome_usuario, email, senha, avatar) => {
        const db = await connectDB();
        const query = 'UPDATE Usuarios SET nome = ?, nome_usuario = ?, email = ?, senha = ?, avatar = ? WHERE id = ?';
        const [results] = await db.execute(query, [nome, nome_usuario, email, senha, avatar, id]);
        db.release(); // Liberar a conexão de volta para o pool
        return results;
    },
    delete: async (id) => {
        const db = await connectDB();
        const query = 'DELETE FROM Usuarios WHERE id = ?';
        const [results] = await db.execute(query, [id]);
        db.release(); // Liberar a conexão de volta para o pool
        return results;
    },
    findAll: async () => {
        const db = await connectDB();
        const query = 'SELECT * FROM Usuarios';
        const [results] = await db.execute(query);
        db.release(); // Liberar a conexão de volta para o pool
        return results;
    }
};

module.exports = User;