const express = require('express');
const scheduleController = require('../controllers/scheduleController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, scheduleController.createSchedule);
router.get('/', authMiddleware, scheduleController.getSchedules);
router.put('/:id', authMiddleware, scheduleController.updateSchedule);
router.delete('/:id', authMiddleware, scheduleController.deleteSchedule);

module.exports = router;