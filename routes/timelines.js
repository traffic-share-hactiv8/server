var express = require('express');
var router = express.Router();
const images         = require('../middleware/upload');
const timelineController = require('../controllers/timelineController');

/* GET time line */
router.get('/',timelineController.getAllTimeline);
router.post('/',images.multer.single('image'), images.sendUploadToGCS,timelineController.createTl);
router.get('/currentUser',timelineController.getTLCurrentUser);
router.put('/:id',timelineController.editTL);

/* delete TL */
router.delete('/:id',timelineController.deleteTL);

module.exports = router;