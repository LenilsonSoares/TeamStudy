const { validationResult } = require('express-validator');

// Função para criar uma nova tarefa
exports.createTask = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { usuario_id, titulo, descricao, data_inicio, data_fim, status } = req.body;
    try {
        const query = 'INSERT INTO Tarefas (usuario_id, titulo, descricao, data_inicio, data_fim, status) VALUES (?, ?, ?, ?, ?, ?)';
        const [results] = await req.db.execute(query, [usuario_id, titulo, descricao, data_inicio, data_fim, status]);
        res.status(201).json({ id: results.insertId });
    } catch (err) {
        next(err);
    }
};

// Função para buscar todas as tarefas
exports.getTasks = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM Tarefas';
        const [results] = await req.db.execute(query);
        res.json(results);
    } catch (err) {
        next(err);
    }
};

// Função para atualizar uma tarefa existente
exports.updateTask = async (req, res, next) => {
    const { id } = req.params;
    const { titulo, descricao, data_inicio, data_fim, status } = req.body;
    try {
        const query = 'UPDATE Tarefas SET titulo = ?, descricao = ?, data_inicio = ?, data_fim = ?, status = ? WHERE id = ?';
        await req.db.execute(query, [titulo, descricao, data_inicio, data_fim, status, id]);
        res.json({ msg: 'Tarefa atualizada com sucesso' });
    } catch (err) {
        next(err);
    }
};

// Função para excluir uma tarefa existente
exports.deleteTask = async (req, res, next) => {
    const { id } = req.params;
    try {
        const query = 'DELETE FROM Tarefas WHERE id = ?';
        await req.db.execute(query, [id]);
        res.json({ msg: 'Tarefa excluída com sucesso' });
    } catch (err) {
        next(err);
    }
};