const express = require('express');
const router = express.Router();
const category = require('../controllers/categories.controller');

router.post('/categories', category.create);
router.get('/categories', category.getAll);

module.exports = router;
