const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const goalController = require('../controllers/goalController');

router.get('/', verifyToken, goalController.getGoals);
router.post('/', verifyToken, goalController.createGoal);
router.put('/:id', verifyToken, goalController.updateGoal);
router.delete('/:id', verifyToken, goalController.deleteGoal);

module.exports = router;