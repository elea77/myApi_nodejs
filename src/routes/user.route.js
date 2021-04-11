const express = require('express');
const router = express.Router();
const user = require('../controllers/users.controller');
const verifyUserToken = require('../middlewares/verifyUserToken');
const verifyAdminToken = require('../middlewares/verifyAdminToken');
const validationSchema = require('../middlewares/validators/users.validation');

router.post('/users', validationSchema, user.create);
router.get('/users', verifyAdminToken, user.getAll);
router.delete('/users/:id', verifyAdminToken, user.deleteOne);
router.get('/users/:id', verifyUserToken, user.getOne);
router.put('/users/:id', verifyUserToken, user.updateOne);
router.post('/login', user.login);

module.exports = router;