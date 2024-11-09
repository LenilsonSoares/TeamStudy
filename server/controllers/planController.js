const { connectDB } = require('../config/db');

exports.createPlan = async (req, res) => {
    const { nome, descricao, preco, usuario_id } = req.body;
    const db = await connectDB();
    const query = 'INSERT INTO Planos (nome, descricao, preco, usuario_id) VALUES (?, ?, ?, ?)';
    db.query(query, [nome, descricao, preco, usuario_id], (err, results) => {
        db.release(); // Liberar a conexão de volta para o pool
        if (err) {
            console.error('Erro ao criar plano:', err);
            return res.status(500).json({ error: 'Erro ao criar plano' });
        }
        res.status(201).json({ id: results.insertId });
    });
};

exports.getPlans = async (req, res) => {
    const db = await connectDB();
    const query = 'SELECT * FROM Planos';
    db.query(query, (err, results) => {
        db.release(); // Liberar a conexão de volta para o pool
        if (err) {
            console.error('Erro ao buscar planos:', err);
            return res.status(500).json({ error: 'Erro ao buscar planos' });
        }
        res.json(results);
    });
};

exports.updatePlan = async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, preco, usuario_id } = req.body;
    const db = await connectDB();
    const query = 'UPDATE Planos SET nome = ?, descricao = ?, preco = ?, usuario_id = ? WHERE id = ?';
    db.query(query, [nome, descricao, preco, usuario_id, id], (err, results) => {
        db.release(); // Liberar a conexão de volta para o pool
        if (err) {
            console.error('Erro ao atualizar plano:', err);
            return res.status(500).json({ error: 'Erro ao atualizar plano' });
        }
        res.json({ msg: 'Plano atualizado com sucesso' });
    });
};

exports.deletePlan = async (req, res) => {
    const { id } = req.params;
    const db = await connectDB();
    const query = 'DELETE FROM Planos WHERE id = ?';
    db.query(query, [id], (err, results) => {
        db.release(); // Liberar a conexão de volta para o pool
        if (err) {
            console.error('Erro ao excluir plano:', err);
            return res.status(500).json({ error: 'Erro ao excluir plano' });
        }
        res.json({ msg: 'Plano excluído com sucesso' });
    });
};