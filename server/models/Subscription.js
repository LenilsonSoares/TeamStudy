const db = require('../config/db')();

const Subscription = {
    create: (usuario_id, plano_id, callback) => {
        const query = 'INSERT INTO Assinaturas (usuario_id, plano_id) VALUES (?, ?)';
        db.query(query, [usuario_id, plano_id], callback);
    },
    findAll: (callback) => {
        const query = 'SELECT * FROM Assinaturas';
        db.query(query, callback);
    },
    findById: (id, callback) => {
        const query = 'SELECT * FROM Assinaturas WHERE id = ?';
        db.query(query, [id], callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM Assinaturas WHERE id = ?';
        db.query(query, [id], callback);
    }
};

module.exports = Subscription;