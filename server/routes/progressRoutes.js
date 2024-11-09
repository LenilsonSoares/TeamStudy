const express = require('express');
const progressController = require('../controllers/progressController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, progressController.createProgress);
router.get('/', authMiddleware, progressController.getProgress);
router.put('/:id', authMiddleware, progressController.updateProgress);
router.delete('/:id', authMiddleware, progressController.deleteProgress);

module.exports = router;