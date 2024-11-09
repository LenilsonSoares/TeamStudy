const request = require('supertest');
const app = require('../server'); // Certifique-se de que o caminho está correto
const token = require('./setup');

describe('Profile API', () => {
    it('should update the user profile', async () => {
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

    it('should get the authenticated user profile', async () => {
        const res = await request(app)
            .get('/api/profile/me')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('nome', 'Updated User');
        expect(res.body).toHaveProperty('email', 'updateduser@example.com');
    });

    it('should not update the profile with invalid data', async () => {
        const res = await request(app)
            .put('/api/profile')
            .set('Authorization', `Bearer ${token}`)
            .send({
                nome: '',
                nome_usuario: '',
                email: 'invalidemail',
                senha: '123',
                avatar: 'newavatar.jpg'
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('errors');
    });

    it('should not get the profile without a token', async () => {
        const res = await request(app)
            .get('/api/profile/me');
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('msg', 'Sem token, autorização negada');
    });
});