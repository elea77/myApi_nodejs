const express = require('express');
const router = express.Router();
const user = require('../controllers/users.controller');
const verifyToken = require('../middlewares/verifyToken');

router.post('/users', user.create);
router.get('/users/:id', verifyToken, user.getOne);
router.post('/login', user.login);

module.exports = router;