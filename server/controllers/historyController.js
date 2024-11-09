const { connectDB } = require('../config/db');

exports.createLessonHistory = async (req, res) => {
    const { usuario_id, curso_id, titulo, descricao } = req.body;
    try {
        const db = await connectDB();
        const query = 'INSERT INTO HistoricoAulas (usuario_id, curso_id, titulo, descricao) VALUES (?, ?, ?, ?)';
        const [results] = await db.execute(query, [usuario_id, curso_id, titulo, descricao]);
        db.release(); // Liberar a conexão de volta para o pool
        res.status(201).json({ id: results.insertId });
    } catch (err) {
        console.error('Erro ao criar histórico de aula:', err);
        res.status(500).json({ error: 'Erro ao criar histórico de aula' });
    }
};

exports.getLessonHistory = async (req, res) => {
    try {
        const db = await connectDB();
        const query = 'SELECT * FROM HistoricoAulas';
        const [results] = await db.execute(query);
        db.release(); // Liberar a conexão de volta para o pool
        res.json(results);
    } catch (err) {
        console.error('Erro ao buscar histórico de aulas:', err);
        res.status(500).json({ error: 'Erro ao buscar histórico de aulas' });
    }
};

exports.createCourseHistory = async (req, res) => {
    const { usuario_id, curso_id, status, progresso } = req.body;
    try {
        const db = await connectDB();
        const query = 'INSERT INTO HistoricoCursos (usuario_id, curso_id, status, progresso) VALUES (?, ?, ?, ?)';
        const [results] = await db.execute(query, [usuario_id, curso_id, status, progresso]);
        db.release(); // Liberar a conexão de volta para o pool
        res.status(201).json({ id: results.insertId });
    } catch (err) {
        console.error('Erro ao criar histórico de curso:', err);
        res.status(500).json({ error: 'Erro ao criar histórico de curso' });
    }
};

exports.getCourseHistory = async (req, res) => {
    try {
        const db = await connectDB();
        const query = 'SELECT * FROM HistoricoCursos';
        const [results] = await db.execute(query);
        db.release(); // Liberar a conexão de volta para o pool
        res.json(results);
    } catch (err) {
        console.error('Erro ao buscar histórico de cursos:', err);
        res.status(500).json({ error: 'Erro ao buscar histórico de cursos' });
    }
};