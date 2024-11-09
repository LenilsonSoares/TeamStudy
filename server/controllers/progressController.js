const { connectDB } = require('../config/db');

exports.createProgress = async (req, res) => {
    const { usuario_id, curso_id, progresso } = req.body;
    try {
        const db = await connectDB();
        const query = 'INSERT INTO Progresso (usuario_id, curso_id, progresso) VALUES (?, ?, ?)';
        const [results] = await db.execute(query, [usuario_id, curso_id, progresso]);
        db.release(); // Liberar a conexão de volta para o pool
        res.status(201).json({ id: results.insertId });
    } catch (err) {
        console.error('Erro ao criar progresso:', err);
        res.status(500).json({ error: 'Erro ao criar progresso' });
    }
};

exports.getProgress = async (req, res) => {
    try {
        const db = await connectDB();
        const query = 'SELECT * FROM Progresso';
        const [results] = await db.execute(query);
        db.release(); // Liberar a conexão de volta para o pool
        res.json(results);
    } catch (err) {
        console.error('Erro ao buscar progresso:', err);
        res.status(500).json({ error: 'Erro ao buscar progresso' });
    }
};

exports.updateProgress = (req, res) => {
    const { id } = req.params;
    const { usuario_id, curso_id, progresso } = req.body;
    const query = 'UPDATE Progresso SET usuario_id = ?, curso_id = ?, progresso = ? WHERE id = ?';
    db.query(query, [usuario_id, curso_id, progresso, id], (err, results) => {
        if (err) {
            console.error('Erro ao atualizar progresso:', err);
            return res.status(500).json({ error: 'Erro ao atualizar progresso' });
        }
        res.json({ msg: 'Progresso atualizado com sucesso' });
    });
};

exports.deleteProgress = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Progresso WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Erro ao excluir progresso:', err);
            return res.status(500).json({ error: 'Erro ao excluir progresso' });
        }
        res.json({ msg: 'Progresso excluído com sucesso' });
    });
};