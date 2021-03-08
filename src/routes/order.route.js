const express = require('express');
const router = express.Router();
const order = require('../controllers/orders.controller');

router.post('/orders', order.create);
router.get('/orders', order.getAll);
router.get('/orders/:id', order.getOne);

module.exports = router;
