const express = require('express');
const router = express.Router();
const product = require('../controllers/products.controller');

router.post('/products', product.create);
router.get('/products', product.getAll);
router.get('/products/:id', product.getOne);
router.put('/products/:id', product.updateOne);

module.exports = router;
