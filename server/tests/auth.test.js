const request = require('supertest');
const app = require('../server'); // Certifique-se de que o caminho está correto

describe('Auth API', () => {
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                nome: 'Test User',
                nome_usuario: 'testuser',
                email: 'testuser@example.com',
                senha: 'password123',
                avatar: 'avatar.jpg'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('token');
    }, 20000); // Aumentar o tempo limite para 20 segundos

    it('should not register a user with existing email', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                nome: 'Test User',
                nome_usuario: 'testuser',
                email: 'testuser@example.com',
                senha: 'password123',
                avatar: 'avatar.jpg'
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('msg', 'Usuário já existe');
    }, 20000); // Aumentar o tempo limite para 20 segundos

    it('should login an existing user', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'testuser@example.com',
                senha: 'password123'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    }, 20000); // Aumentar o tempo limite para 20 segundos

    it('should not login with invalid credentials', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'testuser@example.com',
                senha: 'wrongpassword'
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('msg', 'Credenciais inválidas');
    }, 20000); // Aumentar o tempo limite para 20 segundos
});