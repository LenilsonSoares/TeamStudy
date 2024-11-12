const { connectDB } = require('../config/db');

const Task = {
    create: async (descricao, data, prioridade, cronograma_id) => {
        const db = await connectDB();
        try {
            const query = 'INSERT INTO Tarefas (descricao, data, prioridade, cronograma_id) VALUES (?, ?, ?, ?)';
            const [results] = await db.execute(query, [descricao, data, prioridade, cronograma_id]);
            return results;
        } finally {
            db.release(); // Libera a conexão após a execução
        }
    },
    findAll: async () => {
        const db = await connectDB();
        try {
            const query = 'SELECT * FROM Tarefas';
            const [results] = await db.execute(query);
            return results;
        } finally {
            db.release();
        }
    },
    findById: async (id) => {
        const db = await connectDB();
        try {
            const query = 'SELECT * FROM Tarefas WHERE id = ?';
            const [results] = await db.execute(query, [id]);
            return results[0];
        } finally {
            db.release();
        }
    },
    update: async (id, descricao, data, prioridade, cronograma_id) => {
        const db = await connectDB();
        try {
            const query = 'UPDATE Tarefas SET descricao = ?, data = ?, prioridade = ?, cronograma_id = ? WHERE id = ?';
            const [results] = await db.execute(query, [descricao, data, prioridade, cronograma_id, id]);
            return results;
        } finally {
            db.release();
        }
    },
    delete: async (id) => {
        const db = await connectDB();
        try {
            const query = 'DELETE FROM Tarefas WHERE id = ?';
            const [results] = await db.execute(query, [id]);
            return results;
        } finally {
            db.release();
        }
    }
};

module.exports = Task;