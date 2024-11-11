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

/**
 * Explicação:
 * 
 * getDashboard: Função para buscar dados do dashboard.
 * req: Objeto de requisição HTTP.
 * res: Objeto de resposta HTTP.
 * try: Bloco de código que tenta executar a lógica principal e captura erros se ocorrerem.
 * db = await connectDB(): Conecta ao banco de dados.
 * query = 'SELECT * FROM DashboardData': Define a query SQL para buscar dados do dashboard. Você pode ajustar essa consulta conforme necessário para buscar os dados específicos do seu dashboard.
 * db.execute(query): Executa a query SQL e armazena os resultados na variável results.
 * db.release(): Libera a conexão de volta para o pool de conexões.
 * res.json(results): Retorna os resultados da query como resposta JSON.
 * catch (err): Bloco de código que captura erros se ocorrerem durante a execução do bloco try.
 * console.error('Erro ao buscar dados do dashboard:', err.message): Loga o erro no console.
 * res.status(500).json({ error: 'Erro ao buscar dados do dashboard' }): Retorna erro 500 se ocorrer algum problema no servidor.
 */