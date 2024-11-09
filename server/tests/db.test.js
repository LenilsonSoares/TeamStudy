const connectDB = require('../config/db');

describe('Database Connection', () => {
    it('should connect to the database', async () => {
        const connection = await connectDB();
        expect(connection).toBeDefined();
        await connection.end();
    });
});