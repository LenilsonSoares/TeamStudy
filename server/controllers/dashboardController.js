const { connectDB } = require('../config/db'); // Importa a função connectDB para conectar ao banco de dados

// Função para buscar dados do dashboard
exports.getDashboard = async (req, res) => {
    try {
        const db = await connectDB(); // Conecta ao banco de dados
        const query = 'SELECT * FROM DashboardData'; // Define a query SQL para buscar dados do dashboard (ajuste conforme necessário)
        const [results] = await db.execute(query); // Executa a query e armazena os resultados
        db.release(); // Libera a conexão de volta para o pool
        res.json(results); // Retorna os resultados da query como resposta JSON
    } catch (err) {
        console.error('Erro ao buscar dados do dashboard:', err.message); // Loga o erro no console
        res.status(500).json({ error: 'Erro ao buscar dados do dashboard' }); // Retorna erro 500 se ocorrer algum problema no servidor
    }
};

