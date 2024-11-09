const db = require('../config/db')();

const History = {
    createLessonHistory: (usuario_id, curso_id, titulo, descricao, callback) => {
        const query = 'INSERT INTO HistoricoAulas (usuario_id, curso_id, titulo, descricao) VALUES (?, ?, ?, ?)';
        db.query(query, [usuario_id, curso_id, titulo, descricao], callback);
    },
    findAllLessonHistory: (callback) => {
        const query = 'SELECT * FROM HistoricoAulas';
        db.query(query, callback);
    },
    createCourseHistory: (usuario_id, curso_id, status, progresso, callback) => {
        const query = 'INSERT INTO HistoricoCursos (usuario_id, curso_id, status, progresso) VALUES (?, ?, ?, ?)';
        db.query(query, [usuario_id, curso_id, status, progresso], callback);
    },
    findAllCourseHistory: (callback) => {
        const query = 'SELECT * FROM HistoricoCursos';
        db.query(query, callback);
    }
};

module.exports = History;