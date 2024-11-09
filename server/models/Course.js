const db = require('../config/db')();

const User = {
    create: (nome, nome_usuario, email, senha, avatar, callback) => {
        const query = 'INSERT INTO Usuarios (nome, nome_usuario, email, senha, avatar) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [nome, nome_usuario, email, senha, avatar], callback);
    },
    findByEmail: (email, callback) => {
        const query = 'SELECT * FROM Usuarios WHERE email = ?';
        db.query(query, [email], callback);
    },
    findById: (id, callback) => {
        const query = 'SELECT * FROM Usuarios WHERE id = ?';
        db.query(query, [id], callback);
    },
    update: (id, nome, nome_usuario, email, senha, avatar, callback) => {
        const query = 'UPDATE Usuarios SET nome = ?, nome_usuario = ?, email = ?, senha = ?, avatar = ? WHERE id = ?';
        db.query(query, [nome, nome_usuario, email, senha, avatar, id], callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM Usuarios WHERE id = ?';
        db.query(query, [id], callback);
    }
};

module.exports = User;