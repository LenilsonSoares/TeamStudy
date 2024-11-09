const db = require('../config/db')();

exports.createTask = (req, res) => {
    const { descricao, data, prioridade, cronograma_id } = req.body;
    const query = 'INSERT INTO Tarefas (descricao, data, prioridade, cronograma_id) VALUES (?, ?, ?, ?)';
    db.query(query, [descricao, data, prioridade, cronograma_id], (err, results) => {
        if (err) {
            console.error('Erro ao criar tarefa:', err);
            return res.status(500).json({ error: 'Erro ao criar tarefa' });
        }
        res.status(201).json({ id: results.insertId });
    });
};

exports.getTasks = (req, res) => {
    const query = 'SELECT * FROM Tarefas';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar tarefas:', err);
            return res.status(500).json({ error: 'Erro ao buscar tarefas' });
        }
        res.json(results);
    });
};

exports.updateTask = (req, res) => {
    const { id } = req.params;
    const { descricao, data, prioridade, cronograma_id } = req.body;
    const query = 'UPDATE Tarefas SET descricao = ?, data = ?, prioridade = ?, cronograma_id = ? WHERE id = ?';
    db.query(query, [descricao, data, prioridade, cronograma_id, id], (err, results) => {
        if (err) {
            console.error('Erro ao atualizar tarefa:', err);
            return res.status(500).json({ error: 'Erro ao atualizar tarefa' });
        }
        res.json({ msg: 'Tarefa atualizada com sucesso' });
    });
};

exports.deleteTask = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Tarefas WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Erro ao excluir tarefa:', err);
            return res.status(500).json({ error: 'Erro ao excluir tarefa' });
        }
        res.json({ msg: 'Tarefa excluída com sucesso' });
    });
};
