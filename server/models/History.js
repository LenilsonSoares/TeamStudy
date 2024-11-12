const { connectDB } = require('../config/db');

const History = {
    createLessonHistory: async (usuario_id, curso_id, titulo, descricao) => {
        const db = await connectDB();
        const query = 'INSERT INTO HistoricoAulas (usuario_id, curso_id, titulo, descricao) VALUES (?, ?, ?, ?)';
        const [results] = await db.execute(query, [usuario_id, curso_id, titulo, descricao]);
        db.release();
        return results;
    },
    findAllLessonHistory: async () => {
        const db = await connectDB();
        const query = 'SELECT * FROM HistoricoAulas';
        const [results] = await db.execute(query);
        db.release();
        return results;
    },
    createCourseHistory: async (usuario_id, curso_id, status, progresso) => {
        const db = await connectDB();
        const query = 'INSERT INTO HistoricoCursos (usuario_id, curso_id, status, progresso) VALUES (?, ?, ?, ?)';
        const [results] = await db.execute(query, [usuario_id, curso_id, status, progresso]);
        db.release();
        return results;
    },
    findAllCourseHistory: async () => {
        const db = await connectDB();
        const query = 'SELECT * FROM HistoricoCursos';
        const [results] = await db.execute(query);
        db.release();
        return results;
    }
};

module.exports = History;