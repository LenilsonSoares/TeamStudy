const { validationResult } = require('express-validator');

// Função para criar um novo progresso
exports.createProgress = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { usuario_id, curso_id, progresso } = req.body;
    try {
        const query = 'INSERT INTO Progresso (usuario_id, curso_id, progresso) VALUES (?, ?, ?)';
        const [results] = await req.db.execute(query, [usuario_id, curso_id, progresso]);
        res.status(201).json({ id: results.insertId });
    } catch (err) {
        next(err);
    }
};

// Função para buscar progresso
exports.getProgress = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM Progresso';
        const [results] = await req.db.execute(query);
        res.json(results);
    } catch (err) {
        next(err);
    }
};

// Função para atualizar progresso
exports.updateProgress = async (req, res, next) => {
    const { id } = req.params;
    const { usuario_id, curso_id, progresso } = req.body;
    try {
        const query = 'UPDATE Progresso SET usuario_id = ?, curso_id = ?, progresso = ? WHERE id = ?';
        await req.db.execute(query, [usuario_id, curso_id, progresso, id]);
        res.json({ msg: 'Progresso atualizado com sucesso' });
    } catch (err) {
        next(err);
    }
};

// Função para excluir progresso
exports.deleteProgress = async (req, res, next) => {
    const { id } = req.params;
    try {
        const query = 'DELETE FROM Progresso WHERE id = ?';
        await req.db.execute(query, [id]);
        res.json({ msg: 'Progresso excluído com sucesso' });
    } catch (err) {
        next(err);
    }
};