const { connectDB } = require('../config/db');

const Progress = {
    create: async (usuario_id, curso_id, progresso) => {
        const db = await connectDB();
        const query = 'INSERT INTO Progresso (usuario_id, curso_id, progresso) VALUES (?, ?, ?)';
        const [results] = await db.execute(query, [usuario_id, curso_id, progresso]);
        db.release();
        return results;
    },
    findAll: async () => {
        const db = await connectDB();
        const query = 'SELECT * FROM Progresso';
        const [results] = await db.execute(query);
        db.release();
        return results;
    },
    findById: async (id) => {
        const db = await connectDB();
        const query = 'SELECT * FROM Progresso WHERE id = ?';
        const [results] = await db.execute(query, [id]);
        db.release();
        return results[0];
    }
};

module.exports = Progress;