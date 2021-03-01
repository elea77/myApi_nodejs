const express = require('express');
const router = express.Router();
const user = require('../controllers/users.controller');

router.post('/users', user.create);
router.get('/user/:id', user.getOne);

module.exports = router;