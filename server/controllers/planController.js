const { connectDB } = require('../config/db');

// Função para criar um novo plano
exports.createPlan = async (req, res) => {
    const { nome, descricao, preco, usuario_id } = req.body;
    try {
        const db = await connectDB();
        const query = 'INSERT INTO Planos (nome, descricao, preco, usuario_id) VALUES (?, ?, ?, ?)';
        const [results] = await db.execute(query, [nome, descricao, preco, usuario_id]);
        db.release();
        res.status(201).json({ id: results.insertId });
    } catch (err) {
        console.error('Erro ao criar plano:', err);
        res.status(500).json({ error: 'Erro ao criar plano' });
    }
};

// Função para buscar todos os planos
exports.getPlans = async (req, res) => {
    try {
        const db = await connectDB();
        const query = 'SELECT * FROM Planos';
        const [results] = await db.execute(query);
        db.release();
        res.json(results);
    } catch (err) {
        console.error('Erro ao buscar planos:', err);
        res.status(500).json({ error: 'Erro ao buscar planos' });
    }
};

// Função para atualizar um plano existente
exports.updatePlan = async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, preco, usuario_id } = req.body;
    try {
        const db = await connectDB();
        const query = 'UPDATE Planos SET nome = ?, descricao = ?, preco = ?, usuario_id = ? WHERE id = ?';
        const [results] = await db.execute(query, [nome, descricao, preco, usuario_id, id]);
        db.release();
        res.json({ msg: 'Plano atualizado com sucesso' });
    } catch (err) {
        console.error('Erro ao atualizar plano:', err);
        res.status(500).json({ error: 'Erro ao atualizar plano' });
    }
};

// Função para excluir um plano existente
exports.deletePlan = async (req, res) => {
    const { id } = req.params;
    try {
        const db = await connectDB();
        const query = 'DELETE FROM Planos WHERE id = ?';
        const [results] = await db.execute(query, [id]);
        db.release();
        res.json({ msg: 'Plano excluído com sucesso' });
    } catch (err) {
        console.error('Erro ao excluir plano:', err);
        res.status(500).json({ error: 'Erro ao excluir plano' });
    }
};