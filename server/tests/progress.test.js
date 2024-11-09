const request = require('supertest');
const app = require('../server');

describe('Progress API', () => {
    it('should create a new progress record', async () => {
        const res = await request(app)
            .post('/api/progress')
            .send({
                usuario_id: 1,
                curso_id: 1,
                progresso: 50
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
    });

    it('should get all progress records', async () => {
        const res = await request(app).get('/api/progress');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});