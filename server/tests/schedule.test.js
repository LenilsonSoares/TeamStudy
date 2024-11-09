const request = require('supertest');
const app = require('../server');

describe('Schedule API', () => {
    it('should create a new schedule', async () => {
        const res = await request(app)
            .post('/api/schedules')
            .send({
                nome: 'Test Schedule',
                usuario_id: 1
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
    });

    it('should get all schedules', async () => {
        const res = await request(app).get('/api/schedules');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});