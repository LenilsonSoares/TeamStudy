const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conectar ao banco de dados
connectDB().then(connection => {
    app.locals.db = connection;
}).catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
    if (process.env.NODE_ENV !== 'test') {
        process.exit(1);
    }
});

// Servir arquivos estáticos de todas as pastas dentro de 'client'
app.use('/cadastro', express.static(path.join(__dirname, '../client/Cadastro/public')));
app.use('/cronograma', express.static(path.join(__dirname, '../client/Cronograma/public')));
app.use('/cursos', express.static(path.join(__dirname, '../client/Cursos/public')));
app.use('/dashboard', express.static(path.join(__dirname, '../client/Dashboard/public')));
app.use('/entrar', express.static(path.join(__dirname, '../client/Entrar/public')));
app.use('/home', express.static(path.join(__dirname, '../client/Home/public')));
app.use('/perfil', express.static(path.join(__dirname, '../client/Perfil/public')));

// Rotas
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const courseRoutes = require('./routes/courseRoutes');
const historyRoutes = require('./routes/historyRoutes');
const planRoutes = require('./routes/planRoutes');
const progressRoutes = require('./routes/progressRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

// Servir uma página inicial padrão
app.get('/', (req, res) => {
    res.send('Bem-vindo ao TeamStudy!');
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
    });
}

module.exports = app;