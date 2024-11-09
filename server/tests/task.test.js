const request = require('supertest');
const app = require('../server');

describe('Task API', () => {
    it('should create a new task', async () => {
        const res = await request(app)
            .post('/api/tasks')
            .send({
                descricao: 'Test Task',
                data: '2024-01-01',
                prioridade: 1,
                cronograma_id: 1
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
    });

    it('should get all tasks', async () => {
        const res = await request(app).get('/api/tasks');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});