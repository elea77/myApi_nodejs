const express = require('express');
const router = express.Router();
const category = require('../controllers/categories.controller');

router.post('/categories', product.create);

module.exports = router;
