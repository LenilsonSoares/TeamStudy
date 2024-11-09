const request = require('supertest');
const app = require('../server');
const connectDB = require('../config/db');

describe('User API', () => {
    let connection;
    let userId;

    beforeAll(async () => {
        connection = await connectDB();
    });

    afterAll(async () => {
        await connection.execute('DELETE FROM Usuarios WHERE email = ?', ['testuser@example.com']);
        await connection.end();
    });

    it('should create a new user', async () => {
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
        userId = res.body.user.id;
    });

    it('should get the authenticated user', async () => {
        const loginRes = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'testuser@example.com',
                senha: 'password123'
            });
        const token = loginRes.body.token;

        const res = await request(app)
            .get('/api/users/me')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('nome', 'Test User');
    });

    it('should update the user profile', async () => {
        const loginRes = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'testuser@example.com',
                senha: 'password123'
            });
        const token = loginRes.body.token;

        const res = await request(app)
            .put('/api/profile')
            .set('Authorization', `Bearer ${token}`)
            .send({
                nome: 'Updated User',
                nome_usuario: 'updateduser',
                email: 'updateduser@example.com',
                senha: 'newpassword123',
                avatar: 'newavatar.jpg'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('msg', 'Perfil atualizado com sucesso');
    });

    it('should delete the user', async () => {
        const loginRes = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'testuser@example.com',
                senha: 'password123'
            });
        const token = loginRes.body.token;

        const res = await request(app)
            .delete(`/api/users/${userId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('msg', 'Usuário excluído com sucesso');
    });
});