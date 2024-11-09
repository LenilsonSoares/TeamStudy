exports.getDashboard = (req, res) => {
    // Exemplo de dados que podem ser retornados
    const dashboardData = {
        message: "Bem-vindo ao Dashboard",
        user: req.user, // Supondo que você tenha um middleware de autenticação que adiciona o usuário à requisição
        stats: {
            totalCourses: 10,
            totalTasks: 5,
            progress: 75
        }
    };
    res.json(dashboardData);
};