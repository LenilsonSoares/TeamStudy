const { connectDB } = require('../config/db');

const Goal = {
    create: async (titulo, curso_id, dia, duracao, usuario_id) => {
        const db = await connectDB();
        try {
            const query = 'INSERT INTO Metas (titulo, curso_id, dia, duracao, usuario_id) VALUES (?, ?, ?, ?, ?)';
            const [results] = await db.execute(query, [titulo, curso_id, dia, duracao, usuario_id]);
            return results;
        } finally {
            db.release();
        }
    },
    findAll: async () => {
        const db = await connectDB();
        try {
            const query = 'SELECT * FROM Metas';
            const [results] = await db.execute(query);
            return results;
        } finally {
            db.release();
        }
    },
    findById: async (id) => {
        const db = await connectDB();
        try {
            const query = 'SELECT * FROM Metas WHERE id = ?';
            const [results] = await db.execute(query, [id]);
            return results[0];
        } finally {
            db.release();
        }
    },
    update: async (id, titulo, curso_id, dia, duracao, usuario_id) => {
        const db = await connectDB();
        try {
            const query = 'UPDATE Metas SET titulo = ?, curso_id = ?, dia = ?, duracao = ?, usuario_id = ? WHERE id = ?';
            const [results] = await db.execute(query, [titulo, curso_id, dia, duracao, usuario_id, id]);
            return results;
        } finally {
            db.release();
        }
    },
    delete: async (id) => {
        const db = await connectDB();
        try {
            const query = 'DELETE FROM Metas WHERE id = ?';
            const [results] = await db.execute(query, [id]);
            return results;
        } finally {
            db.release();
        }
    }
};

module.exports = Goal;