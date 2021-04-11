const express = require('express');
const router = express.Router();
const order = require('../controllers/orders.controller');
const verifyAdminToken = require('../middlewares/verifyAdminToken');

router.post('/orders', order.create);
router.get('/orders', verifyAdminToken, order.getAll);
router.get('/orders/:id', order.getOne);
router.put('/orders/:id', verifyAdminToken,order.updateOne);

module.exports = router;
