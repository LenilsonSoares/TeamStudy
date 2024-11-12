const { connectDB } = require('../config/db');

const Subscription = {
    create: async (usuario_id, plano_id) => {
        const db = await connectDB();
        const query = 'INSERT INTO Assinaturas (usuario_id, plano_id) VALUES (?, ?)';
        const [results] = await db.execute(query, [usuario_id, plano_id]);
        db.release();
        return results;
    },
    findAll: async () => {
        const db = await connectDB();
        const query = 'SELECT * FROM Assinaturas';
        const [results] = await db.execute(query);
        db.release();
        return results;
    },
    findById: async (id) => {
        const db = await connectDB();
        const query = 'SELECT * FROM Assinaturas WHERE id = ?';
        const [results] = await db.execute(query, [id]);
        db.release();
        return results[0];
    },
    delete: async (id) => {
        const db = await connectDB();
        const query = 'DELETE FROM Assinaturas WHERE id = ?';
        const [results] = await db.execute(query, [id]);
        db.release();
        return results;
    }
};

module.exports = Subscription;