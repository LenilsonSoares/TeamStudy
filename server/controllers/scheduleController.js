const { validationResult } = require('express-validator');

// Função para criar um novo cronograma
exports.createSchedule = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { usuario_id, titulo, descricao, data_inicio, data_fim } = req.body;
    try {
        const query = 'INSERT INTO Cronogramas (usuario_id, titulo, descricao, data_inicio, data_fim) VALUES (?, ?, ?, ?, ?)';
        const [results] = await req.db.execute(query, [usuario_id, titulo, descricao, data_inicio, data_fim]);
        res.status(201).json({ id: results.insertId });
    } catch (err) {
        next(err);
    }
};

// Função para buscar cronogramas
exports.getSchedules = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM Cronogramas';
        const [results] = await req.db.execute(query);
        res.json(results);
    } catch (err) {
        next(err);
    }
};

// Função para atualizar cronograma
exports.updateSchedule = async (req, res, next) => {
    const { id } = req.params;
    const { titulo, descricao, data_inicio, data_fim } = req.body;
    try {
        const query = 'UPDATE Cronogramas SET titulo = ?, descricao = ?, data_inicio = ?, data_fim = ? WHERE id = ?';
        await req.db.execute(query, [titulo, descricao, data_inicio, data_fim, id]);
        res.json({ msg: 'Cronograma atualizado com sucesso' });
    } catch (err) {
        next(err);
    }
};

// Função para excluir cronograma
exports.deleteSchedule = async (req, res, next) => {
    const { id } = req.params;
    try {
        const query = 'DELETE FROM Cronogramas WHERE id = ?';
        await req.db.execute(query, [id]);
        res.json({ msg: 'Cronograma excluído com sucesso' });
    } catch (err) {
        next(err);
    }
};