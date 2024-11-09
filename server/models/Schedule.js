const db = require('../config/db')();

const Schedule = {
    create: (nome, usuario_id, callback) => {
        const query = 'INSERT INTO Cronogramas (nome, usuario_id) VALUES (?, ?)';
        db.query(query, [nome, usuario_id], callback);
    },
    findAll: (callback) => {
        const query = 'SELECT * FROM Cronogramas';
        db.query(query, callback);
    },
    findById: (id, callback) => {
        const query = 'SELECT * FROM Cronogramas WHERE id = ?';
        db.query(query, [id], callback);
    },
    update: (id, nome, usuario_id, callback) => {
        const query = 'UPDATE Cronogramas SET nome = ?, usuario_id = ? WHERE id = ?';
        db.query(query, [nome, usuario_id, id], callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM Cronogramas WHERE id = ?';
        db.query(query, [id], callback);
    }
};

module.exports = Schedule;