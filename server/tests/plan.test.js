const request = require('supertest');
const app = require('../server');

describe('Plan API', () => {
    it('should create a new plan', async () => {
        const res = await request(app)
            .post('/api/plans')
            .send({
                nome: 'Test Plan',
                descricao: 'This is a test plan',
                preco: 99.99
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
    });

    it('should get all plans', async () => {
        const res = await request(app).get('/api/plans');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});