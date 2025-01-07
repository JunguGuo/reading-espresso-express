const express = require('express');
const readController = require('../controllers/readController');

const router = express.Router();

//router.param('id', readController.checkID);

router
  .route('/')
  .get(readController.getAllReads)
  .post(readController.createRead);
router
  .route('/:id')
  .get(readController.getRead)
  .patch(readController.updateRead)
  .delete(readController.deleteRead);

module.exports = router;
