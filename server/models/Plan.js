const db = require('../config/db')();

const Plan = {
    create: (nome, descricao, preco, callback) => {
        const query = 'INSERT INTO Planos (nome, descricao, preco) VALUES (?, ?, ?)';
        db.query(query, [nome, descricao, preco], callback);
    },
    findAll: (callback) => {
        const query = 'SELECT * FROM Planos';
        db.query(query, callback);
    },
    findById: (id, callback) => {
        const query = 'SELECT * FROM Planos WHERE id = ?';
        db.query(query, [id], callback);
    },
    update: (id, nome, descricao, preco, callback) => {
        const query = 'UPDATE Planos SET nome = ?, descricao = ?, preco = ? WHERE id = ?';
        db.query(query, [nome, descricao, preco, id], callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM Planos WHERE id = ?';
        db.query(query, [id], callback);
    }
};

module.exports = Plan;