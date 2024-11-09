const express = require('express');
const planController = require('../controllers/planController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, planController.createPlan);
router.get('/', authMiddleware, planController.getPlans);
router.put('/:id', authMiddleware, planController.updatePlan);
router.delete('/:id', authMiddleware, planController.deletePlan);

module.exports = router;