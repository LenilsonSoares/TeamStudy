const { connectDB } = require('../config/db');

exports.createTask = async (req, res) => {
    const { usuario_id, titulo, descricao, data_inicio, data_fim, status } = req.body;
    try {
        const db = await connectDB();
        const query = 'INSERT INTO Tarefas (usuario_id, titulo, descricao, data_inicio, data_fim, status) VALUES (?, ?, ?, ?, ?, ?)';
        const [results] = await db.execute(query, [usuario_id, titulo, descricao, data_inicio, data_fim, status]);
        db.release(); // Liberar a conexão de volta para o pool
        res.status(201).json({ id: results.insertId });
    } catch (err) {
        console.error('Erro ao criar tarefa:', err);
        res.status(500).json({ error: 'Erro ao criar tarefa' });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const db = await connectDB();
        const query = 'SELECT * FROM Tarefas';
        const [results] = await db.execute(query);
        db.release(); // Liberar a conexão de volta para o pool
        res.json(results);
    } catch (err) {
        console.error('Erro ao buscar tarefas:', err);
        res.status(500).json({ error: 'Erro ao buscar tarefas' });
    }
};

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, data_inicio, data_fim, status } = req.body;
    try {
        const db = await connectDB();
        const query = 'UPDATE Tarefas SET titulo = ?, descricao = ?, data_inicio = ?, data_fim = ?, status = ? WHERE id = ?';
        const [results] = await db.execute(query, [titulo, descricao, data_inicio, data_fim, status, id]);
        db.release(); // Liberar a conexão de volta para o pool
        res.json({ msg: 'Tarefa atualizada com sucesso' });
    } catch (err) {
        console.error('Erro ao atualizar tarefa:', err);
        res.status(500).json({ error: 'Erro ao atualizar tarefa' });
    }
};

exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const db = await connectDB();
        const query = 'DELETE FROM Tarefas WHERE id = ?';
        const [results] = await db.execute(query, [id]);
        db.release(); // Liberar a conexão de volta para o pool
        res.json({ msg: 'Tarefa excluída com sucesso' });
    } catch (err) {
        console.error('Erro ao excluir tarefa:', err);
        res.status(500).json({ error: 'Erro ao excluir tarefa' });
    }
};