const { connectDB } = require('../config/db');

// Função para buscar dados do dashboard
exports.getDashboard = async (req, res) => {
    try {
        const db = await connectDB();
        const query = 'SELECT * FROM DashboardData';
        const [results] = await db.execute(query);
        db.release();
        res.json(results);
    } catch (err) {
        console.error('Erro ao buscar dados do dashboard:', err.message);
        res.status(500).json({ error: 'Erro ao buscar dados do dashboard' });
    }
};