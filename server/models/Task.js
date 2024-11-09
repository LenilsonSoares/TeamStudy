const db = require('../config/db')();

const Task = {
    create: (descricao, data, prioridade, cronograma_id, callback) => {
        const query = 'INSERT INTO Tarefas (descricao, data, prioridade, cronograma_id) VALUES (?, ?, ?, ?)';
        db.query(query, [descricao, data, prioridade, cronograma_id], callback);
    },
    findAll: (callback) => {
        const query = 'SELECT * FROM Tarefas';
        db.query(query, callback);
    },
    findById: (id, callback) => {
        const query = 'SELECT * FROM Tarefas WHERE id = ?';
        db.query(query, [id], callback);
    },
    update: (id, descricao, data, prioridade, cronograma_id, callback) => {
        const query = 'UPDATE Tarefas SET descricao = ?, data = ?, prioridade = ?, cronograma_id = ? WHERE id = ?';
        db.query(query, [descricao, data, prioridade, cronograma_id, id], callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM Tarefas WHERE id = ?';
        db.query(query, [id], callback);
    }
};

module.exports = Task;