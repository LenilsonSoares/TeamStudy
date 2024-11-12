const { connectDB } = require('../config/db');

const Schedule = {
    create: async (nome, usuario_id) => {
        const db = await connectDB();
        const query = 'INSERT INTO Cronogramas (nome, usuario_id) VALUES (?, ?)';
        const [results] = await db.execute(query, [nome, usuario_id]);
        db.release();
        return results;
    },
    findAll: async () => {
        const db = await connectDB();
        const query = 'SELECT * FROM Cronogramas';
        const [results] = await db.execute(query);
        db.release();
        return results;
    },
    findById: async (id) => {
        const db = await connectDB();
        const query = 'SELECT * FROM Cronogramas WHERE id = ?';
        const [results] = await db.execute(query, [id]);
        db.release();
        return results[0];
    },
    update: async (id, nome, usuario_id) => {
        const db = await connectDB();
        const query = 'UPDATE Cronogramas SET nome = ?, usuario_id = ? WHERE id = ?';
        const [results] = await db.execute(query, [nome, usuario_id, id]);
        db.release();
        return results;
    },
    delete: async (id) => {
        const db = await connectDB();
        const query = 'DELETE FROM Cronogramas WHERE id = ?';
        const [results] = await db.execute(query, [id]);
        db.release();
        return results;
    }
};

module.exports = Schedule;