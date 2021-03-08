const express = require('express');
const router = express.Router();
const user = require('../controllers/users.controller');
const verifyToken = require('../middlewares/verifyToken');
const validationSchema = require('../middlewares/users.validation');

// router.post('/users', user.create);
router.post('/users', validationSchema, user.create);
router.get('/users/:id', verifyToken, user.getOne);
router.post('/login', user.login);

module.exports = router;