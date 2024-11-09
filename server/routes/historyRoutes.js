const express = require('express');
const historyController = require('../controllers/historyController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/lesson', authMiddleware, historyController.createLessonHistory);
router.get('/lesson', authMiddleware, historyController.getLessonHistory);
router.post('/course', authMiddleware, historyController.createCourseHistory);
router.get('/course', authMiddleware, historyController.getCourseHistory);

module.exports = router;