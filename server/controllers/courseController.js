const db = require('../config/db')();

exports.createCourse = (req, res) => {
    const { nome, descricao, duracao, imagem } = req.body;
    const query = 'INSERT INTO Cursos (nome, descricao, duracao, imagem) VALUES (?, ?, ?, ?)';
    db.query(query, [nome, descricao, duracao, imagem], (err, results) => {
        if (err) {
            console.error('Erro ao criar curso:', err);
            return res.status(500).json({ error: 'Erro ao criar curso' });
        }
        res.status(201).json({ id: results.insertId });
    });
};

exports.getCourses = (req, res) => {
    const query = 'SELECT * FROM Cursos';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar cursos:', err);
            return res.status(500).json({ error: 'Erro ao buscar cursos' });
        }
        res.json(results);
    });
};

exports.updateCourse = (req, res) => {
    const { id } = req.params;
    const { nome, descricao, duracao, imagem } = req.body;
    const query = 'UPDATE Cursos SET nome = ?, descricao = ?, duracao = ?, imagem = ? WHERE id = ?';
    db.query(query, [nome, descricao, duracao, imagem, id], (err, results) => {
        if (err) {
            console.error('Erro ao atualizar curso:', err);
            return res.status(500).json({ error: 'Erro ao atualizar curso' });
        }
        res.json({ msg: 'Curso atualizado com sucesso' });
    });
};

exports.deleteCourse = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Cursos WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Erro ao excluir curso:', err);
            return res.status(500).json({ error: 'Erro ao excluir curso' });
        }
        res.json({ msg: 'Curso excluído com sucesso' });
    });
};