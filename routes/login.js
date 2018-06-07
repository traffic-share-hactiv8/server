var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

/* login users */
router.post('/', userController.loginUser);

module.exports = router;