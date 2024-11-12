const { connectDB } = require('../config/db');

const Plan = {
    create: async (nome, descricao, preco) => {
        const db = await connectDB();
        const query = 'INSERT INTO Planos (nome, descricao, preco) VALUES (?, ?, ?)';
        const [results] = await db.execute(query, [nome, descricao, preco]);
        db.release();
        return results;
    },
    findAll: async () => {
        const db = await connectDB();
        const query = 'SELECT * FROM Planos';
        const [results] = await db.execute(query);
        db.release();
        return results;
    },
    findById: async (id) => {
        const db = await connectDB();
        const query = 'SELECT * FROM Planos WHERE id = ?';
        const [results] = await db.execute(query, [id]);
        db.release();
        return results[0];
    },
    update: async (id, nome, descricao, preco) => {
        const db = await connectDB();
        const query = 'UPDATE Planos SET nome = ?, descricao = ?, preco = ? WHERE id = ?';
        const [results] = await db.execute(query, [nome, descricao, preco, id]);
        db.release();
        return results;
    },
    delete: async (id) => {
        const db = await connectDB();
        const query = 'DELETE FROM Planos WHERE id = ?';
        const [results] = await db.execute(query, [id]);
        db.release();
        return results;
    }
};

module.exports = Plan;