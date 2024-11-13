const { connectDB } = require('../config/db');

exports.getProgress = async (req, res, next) => {
    const { usuarioId } = req.params;
    try {
        const db = await connectDB();
        const query = 'SELECT * FROM Progresso WHERE usuario_id = ?';
        const [progress] = await db.execute(query, [usuarioId]);
        db.release();
        res.json(progress);
    } catch (err) {
        next(err);
    }
};