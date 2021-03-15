const express = require('express');
const router = express.Router();
const category = require('../controllers/categories.controller');

router.post('/categories', category.create);

module.exports = router;
