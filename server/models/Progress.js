const db = require('../config/db')();

const Progress = {
    create: (usuario_id, curso_id, progresso, callback) => {
        const query = 'INSERT INTO Progresso (usuario_id, curso_id, progresso) VALUES (?, ?, ?)';
        db.query(query, [usuario_id, curso_id, progresso], callback);
    },
    findAll: (callback) => {
        const query = 'SELECT * FROM Progresso';
        db.query(query, callback);
    },
    findById: (id, callback) => {
        const query = 'SELECT * FROM Progresso WHERE id = ?';
        db.query(query, [id], callback);
    }
};

module.exports = Progress;