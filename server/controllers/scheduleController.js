const { connectDB } = require('../config/db');

exports.createSchedule = async (req, res) => {
    const { usuario_id, titulo, descricao, data_inicio, data_fim } = req.body;
    try {
        const db = await connectDB();
        const query = 'INSERT INTO Cronogramas (usuario_id, titulo, descricao, data_inicio, data_fim) VALUES (?, ?, ?, ?, ?)';
        const [results] = await db.execute(query, [usuario_id, titulo, descricao, data_inicio, data_fim]);
        db.release(); // Liberar a conexão de volta para o pool
        res.status(201).json({ id: results.insertId });
    } catch (err) {
        console.error('Erro ao criar cronograma:', err);
        res.status(500).json({ error: 'Erro ao criar cronograma' });
    }
};

exports.getSchedules = async (req, res) => {
    try {
        const db = await connectDB();
        const query = 'SELECT * FROM Cronogramas';
        const [results] = await db.execute(query);
        db.release(); // Liberar a conexão de volta para o pool
        res.json(results);
    } catch (err) {
        console.error('Erro ao buscar cronogramas:', err);
        res.status(500).json({ error: 'Erro ao buscar cronogramas' });
    }
};

exports.updateSchedule = async (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, data_inicio, data_fim } = req.body;
    try {
        const db = await connectDB();
        const query = 'UPDATE Cronogramas SET titulo = ?, descricao = ?, data_inicio = ?, data_fim = ? WHERE id = ?';
        const [results] = await db.execute(query, [titulo, descricao, data_inicio, data_fim, id]);
        db.release(); // Liberar a conexão de volta para o pool
        res.json({ msg: 'Cronograma atualizado com sucesso' });
    } catch (err) {
        console.error('Erro ao atualizar cronograma:', err);
        res.status(500).json({ error: 'Erro ao atualizar cronograma' });
    }
};

exports.deleteSchedule = async (req, res) => {
    const { id } = req.params;
    try {
        const db = await connectDB();
        const query = 'DELETE FROM Cronogramas WHERE id = ?';
        const [results] = await db.execute(query, [id]);
        db.release(); // Liberar a conexão de volta para o pool
        res.json({ msg: 'Cronograma excluído com sucesso' });
    } catch (err) {
        console.error('Erro ao excluir cronograma:', err);
        res.status(500).json({ error: 'Erro ao excluir cronograma' });
    }
};