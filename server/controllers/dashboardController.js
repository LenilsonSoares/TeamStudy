const { connectDB } = require('../config/db');

exports.getDashboard = async (req, res) => {
    try {
        const db = await connectDB();
        const query = 'SELECT * FROM DashboardData'; // Ajuste a consulta conforme necessário
        const [results] = await db.execute(query);
        db.release(); // Liberar a conexão de volta para o pool
        res.json(results);
    } catch (err) {
        console.error('Erro ao buscar dados do dashboard:', err.message);
        res.status(500).json({ error: 'Erro ao buscar dados do dashboard' });
    }
};