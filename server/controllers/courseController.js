const { connectDB } = require('../config/db');

// Função para criar um novo curso
exports.createCourse = async (req, res) => {
    const { nome, descricao, duracao, imagem } = req.body;
    try {
        const db = await connectDB();
        const query = 'INSERT INTO Cursos (nome, descricao, duracao, imagem) VALUES (?, ?, ?, ?)';
        const [results] = await db.execute(query, [nome, descricao, duracao, imagem]);
        db.release();
        res.status(201).json({ id: results.insertId });
    } catch (err) {
        console.error('Erro ao criar curso:', err);
        res.status(500).json({ error: 'Erro ao criar curso' });
    }
};

// Função para buscar todos os cursos
exports.getCourses = async (req, res) => {
    try {
        const db = await connectDB();
        const query = 'SELECT * FROM Cursos';
        const [results] = await db.execute(query);
        db.release();
        res.json(results);
    } catch (err) {
        console.error('Erro ao buscar cursos:', err);
        res.status(500).json({ error: 'Erro ao buscar cursos' });
    }
};

// Função para atualizar um curso existente
exports.updateCourse = async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, duracao, imagem } = req.body;
    try {
        const db = await connectDB();
        const query = 'UPDATE Cursos SET nome = ?, descricao = ?, duracao = ?, imagem = ? WHERE id = ?';
        const [results] = await db.execute(query, [nome, descricao, duracao, imagem, id]);
        db.release();
        res.json({ msg: 'Curso atualizado com sucesso' });
    } catch (err) {
        console.error('Erro ao atualizar curso:', err);
        res.status(500).json({ error: 'Erro ao atualizar curso' });
    }
};

// Função para excluir um curso existente
exports.deleteCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const db = await connectDB();
        const query = 'DELETE FROM Cursos WHERE id = ?';
        const [results] = await db.execute(query, [id]);
        db.release();
        res.json({ msg: 'Curso excluído com sucesso' });
    } catch (err) {
        console.error('Erro ao excluir curso:', err);
        res.status(500).json({ error: 'Erro ao excluir curso' });
    }
};