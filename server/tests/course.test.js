const request = require('supertest');
const app = require('../server');
const token = require('./setup');

describe('Course API', () => {
    it('should create a new course', async () => {
        const res = await request(app)
            .post('/api/courses')
            .set('Authorization', `Bearer ${token}`)
            .send({
                nome: 'Test Course',
                descricao: 'This is a test course',
                duracao: 10,
                imagem: 'test.jpg'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
    });

    it('should get all courses', async () => {
        const res = await request(app)
            .get('/api/courses')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});