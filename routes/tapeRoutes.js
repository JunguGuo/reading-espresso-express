const express = require('express');
const tapeController = require('../controllers/tapeController');

const router = express.Router();

//router.param('id', readController.checkID);

router
  .route('/')
  .get(tapeController.getAllTapes)
  .post(tapeController.createTape);

router
  .route('/:id')
  .get(tapeController.getTape)
  .patch(tapeController.updateTape)
  .delete(tapeController.deleteTape);

router.route('/construct').post(tapeController.constructTape);

module.exports = router;
