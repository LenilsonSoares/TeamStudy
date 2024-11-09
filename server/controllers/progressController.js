const db = require('../config/db')();

exports.createProgress = (req, res) => {
    const { usuario_id, curso_id, progresso } = req.body;
    const query = 'INSERT INTO Progresso (usuario_id, curso_id, progresso) VALUES (?, ?, ?)';
    db.query(query, [usuario_id, curso_id, progresso], (err, results) => {
        if (err) {
            console.error('Erro ao registrar progresso:', err);
            return res.status(500).json({ error: 'Erro ao registrar progresso' });
        }
        res.status(201).json({ id: results.insertId });
    });
};

exports.getProgress = (req, res) => {
    const query = 'SELECT * FROM Progresso';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar progresso:', err);
            return res.status(500).json({ error: 'Erro ao buscar progresso' });
        }
        res.json(results);
    });
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