const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

// Defina suas rotas aqui
router.get('/', profileController.getProfile);
router.post('/', profileController.createProfile);
router.put('/:id', profileController.updateProfile);
router.delete('/:id', profileController.deleteProfile);

module.exports = router;