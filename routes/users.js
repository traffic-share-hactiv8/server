var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')

/* GET users listing. */
router.get('/', userController.getAlluser);
router.get('/:id', userController.getUserById);
/* Update users */
router.put('/:id', userController.updateUser);
// deactivated user 
router.post('/deactivated', userController.deactivatedUser);

// activated user 
router.post('/activated', userController.activatedUser)

module.exports = router;