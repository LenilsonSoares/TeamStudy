const { connectDB } = require('../config/db');

// Função para criar um novo histórico de aula
exports.createLessonHistory = async (req, res) => {
    const { usuario_id, curso_id, titulo, descricao } = req.body;
    try {
        const db = await connectDB();
        const query = 'INSERT INTO HistoricoAulas (usuario_id, curso_id, titulo, descricao) VALUES (?, ?, ?, ?)';
        const [results] = await db.execute(query, [usuario_id, curso_id, titulo, descricao]);
        db.release();
        res.status(201).json({ id: results.insertId });
    } catch (err) {
        console.error('Erro ao criar histórico de aula:', err);
        res.status(500).json({ error: 'Erro ao criar histórico de aula' });
    }
};

// Função para buscar histórico de aulas
exports.getLessonHistory = async (req, res) => {
    try {
        const db = await connectDB();
        const query = 'SELECT * FROM HistoricoAulas';
        const [results] = await db.execute(query);
        db.release();
        res.json(results);
    } catch (err) {
        console.error('Erro ao buscar histórico de aulas:', err);
        res.status(500).json({ error: 'Erro ao buscar histórico de aulas' });
    }
};

// Função para criar um novo histórico de curso
exports.createCourseHistory = async (req, res) => {
    const { usuario_id, curso_id, status, progresso } = req.body;
    try {
        const db = await connectDB();
        const query = 'INSERT INTO HistoricoCursos (usuario_id, curso_id, status, progresso) VALUES (?, ?, ?, ?)';
        const [results] = await db.execute(query, [usuario_id, curso_id, status, progresso]);
        db.release();
        res.status(201).json({ id: results.insertId });
    } catch (err) {
        console.error('Erro ao criar histórico de curso:', err);
        res.status(500).json({ error: 'Erro ao criar histórico de curso' });
    }
};

// Função para buscar histórico de cursos
exports.getCourseHistory = async (req, res) => {
    try {
        const db = await connectDB();
        const query = 'SELECT * FROM HistoricoCursos';
        const [results] = await db.execute(query);
        db.release();
        res.json(results);
    } catch (err) {
        console.error('Erro ao buscar histórico de cursos:', err);
        res.status(500).json({ error: 'Erro ao buscar histórico de cursos' });
    }
};