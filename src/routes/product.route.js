const express = require('express');
const router = express.Router();
const product = require('../controllers/products.controller');
const verifyAdminToken = require('../middlewares/verifyAdminToken');

router.post('/products', verifyAdminToken, product.create);
router.get('/products', product.getAll);
router.get('/products/:id', product.getOne);
router.put('/products/:id', verifyAdminToken, product.updateOne);
router.delete('/products/:id', verifyAdminToken, product.deleteOne);

module.exports = router;
