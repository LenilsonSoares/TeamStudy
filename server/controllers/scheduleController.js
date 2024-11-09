const db = require('../config/db')();

exports.createSchedule = (req, res) => {
    const { nome, usuario_id } = req.body;
    const query = 'INSERT INTO Cronogramas (nome, usuario_id) VALUES (?, ?)';
    db.query(query, [nome, usuario_id], (err, results) => {
        if (err) {
            console.error('Erro ao criar cronograma:', err);
            return res.status(500).json({ error: 'Erro ao criar cronograma' });
        }
        res.status(201).json({ id: results.insertId });
    });
};

exports.getSchedules = (req, res) => {
    const query = 'SELECT * FROM Cronogramas';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar cronogramas:', err);
            return res.status(500).json({ error: 'Erro ao buscar cronogramas' });
        }
        res.json(results);
    });
};

exports.updateSchedule = (req, res) => {
    const { id } = req.params;
    const { nome, usuario_id } = req.body;
    const query = 'UPDATE Cronogramas SET nome = ?, usuario_id = ? WHERE id = ?';
    db.query(query, [nome, usuario_id, id], (err, results) => {
        if (err) {
            console.error('Erro ao atualizar cronograma:', err);
            return res.status(500).json({ error: 'Erro ao atualizar cronograma' });
        }
        res.json({ msg: 'Cronograma atualizado com sucesso' });
    });
};

exports.deleteSchedule = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Cronogramas WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Erro ao excluir cronograma:', err);
            return res.status(500).json({ error: 'Erro ao excluir cronograma' });
        }
        res.json({ msg: 'Cronograma excluído com sucesso' });
    });
};