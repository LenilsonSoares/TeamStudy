const request = require('supertest');
const app = require('../server');

describe('History API', () => {
    it('should create a new lesson history record', async () => {
        const res = await request(app)
            .post('/api/history/lesson')
            .send({
                usuario_id: 1,
                curso_id: 1,
                titulo: 'Test Lesson',
                descricao: 'This is a test lesson'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
    });

    it('should get all lesson history records', async () => {
        const res = await request(app).get('/api/history/lesson');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('should create a new course history record', async () => {
        const res = await request(app)
            .post('/api/history/course')
            .send({
                usuario_id: 1,
                curso_id: 1,
                status: 'completed',
                progresso: 100
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
    });

    it('should get all course history records', async () => {
        const res = await request(app).get('/api/history/course');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});