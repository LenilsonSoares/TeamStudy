const db = require('../config/db')();

exports.createLessonHistory = (req, res) => {
    const { usuario_id, curso_id, titulo, descricao } = req.body;
    const query = 'INSERT INTO HistoricoAulas (usuario_id, curso_id, titulo, descricao) VALUES (?, ?, ?, ?)';
    db.query(query, [usuario_id, curso_id, titulo, descricao], (err, results) => {
        if (err) {
            console.error('Erro ao registrar histórico de aula:', err);
            return res.status(500).json({ error: 'Erro ao registrar histórico de aula' });
        }
        res.status(201).json({ id: results.insertId });
    });
};

exports.getLessonHistory = (req, res) => {
    const query = 'SELECT * FROM HistoricoAulas';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar histórico de aulas:', err);
            return res.status(500).json({ error: 'Erro ao buscar histórico de aulas' });
        }
        res.json(results);
    });
};

exports.createCourseHistory = (req, res) => {
    const { usuario_id, curso_id, status, progresso } = req.body;
    const query = 'INSERT INTO HistoricoCursos (usuario_id, curso_id, status, progresso) VALUES (?, ?, ?, ?)';
    db.query(query, [usuario_id, curso_id, status, progresso], (err, results) => {
        if (err) {
            console.error('Erro ao registrar histórico de curso:', err);
            return res.status(500).json({ error: 'Erro ao registrar histórico de curso' });
        }
        res.status(201).json({ id: results.insertId });
    });
};

exports.getCourseHistory = (req, res) => {
    const query = 'SELECT * FROM HistoricoCursos';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar histórico de cursos:', err);
            return res.status(500).json({ error: 'Erro ao buscar histórico de cursos' });
        }
        res.json(results);
    });
};