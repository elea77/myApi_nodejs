const express = require('express');
const router = express.Router();
const user = require('../controllers/users.controller');

router.post('/users', user.create);
router.get('/user/:id', user.getOne);
router.post('/login', user.login);

module.exports = router;