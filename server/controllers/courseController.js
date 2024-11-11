const { connectDB } = require('../config/db'); // Importa a função connectDB para conectar ao banco de dados

// Função para criar um novo curso
exports.createCourse = async (req, res) => {
    const { nome, descricao, duracao, imagem } = req.body; // Extrai nome, descrição, duração e imagem do corpo da requisição
    try {
        const db = await connectDB(); // Conecta ao banco de dados
        const query = 'INSERT INTO Cursos (nome, descricao, duracao, imagem) VALUES (?, ?, ?, ?)'; // Define a query SQL para inserir um novo curso
        const [results] = await db.execute(query, [nome, descricao, duracao, imagem]); // Executa a query com os valores fornecidos
        db.release(); // Libera a conexão de volta para o pool
        res.status(201).json({ id: results.insertId }); // Retorna o ID do novo curso criado
    } catch (err) {
        console.error('Erro ao criar curso:', err); // Loga o erro no console
        res.status(500).json({ error: 'Erro ao criar curso' }); // Retorna erro 500 se ocorrer algum problema no servidor
    }
};

// Função para buscar todos os cursos
exports.getCourses = async (req, res) => {
    try {
        const db = await connectDB(); // Conecta ao banco de dados
        const query = 'SELECT * FROM Cursos'; // Define a query SQL para buscar todos os cursos
        const [results] = await db.execute(query); // Executa a query
        db.release(); // Libera a conexão de volta para o pool
        res.json(results); // Retorna a lista de cursos
    } catch (err) {
        console.error('Erro ao buscar cursos:', err); // Loga o erro no console
        res.status(500).json({ error: 'Erro ao buscar cursos' }); // Retorna erro 500 se ocorrer algum problema no servidor
    }
};

// Função para atualizar um curso existente
exports.updateCourse = async (req, res) => {
    const { id } = req.params; // Extrai o ID do curso dos parâmetros da URL
    const { nome, descricao, duracao, imagem } = req.body; // Extrai nome, descrição, duração e imagem do corpo da requisição
    try {
        const db = await connectDB(); // Conecta ao banco de dados
        const query = 'UPDATE Cursos SET nome = ?, descricao = ?, duracao = ?, imagem = ? WHERE id = ?'; // Define a query SQL para atualizar um curso
        const [results] = await db.execute(query, [nome, descricao, duracao, imagem, id]); // Executa a query com os valores fornecidos
        db.release(); // Libera a conexão de volta para o pool
        res.json({ msg: 'Curso atualizado com sucesso' }); // Retorna mensagem de sucesso
    } catch (err) {
        console.error('Erro ao atualizar curso:', err); // Loga o erro no console
        res.status(500).json({ error: 'Erro ao atualizar curso' }); // Retorna erro 500 se ocorrer algum problema no servidor
    }
};

// Função para excluir um curso existente
exports.deleteCourse = async (req, res) => {
    const { id } = req.params; // Extrai o ID do curso dos parâmetros da URL
    try {
        const db = await connectDB(); // Conecta ao banco de dados
        const query = 'DELETE FROM Cursos WHERE id = ?'; // Define a query SQL para excluir um curso
        const [results] = await db.execute(query, [id]); // Executa a query com o ID do curso
        db.release(); // Libera a conexão de volta para o pool
        res.json({ msg: 'Curso excluído com sucesso' }); // Retorna mensagem de sucesso
    } catch (err) {
        console.error('Erro ao excluir curso:', err); // Loga o erro no console
        res.status(500).json({ error: 'Erro ao excluir curso' }); // Retorna erro 500 se ocorrer algum problema no servidor
    }
};