var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

/* register new users */
router.post('/', userController.registerUser);

module.exports = router;