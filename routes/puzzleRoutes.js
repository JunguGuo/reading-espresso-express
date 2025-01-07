const express = require('express');
const puzzleController = require('../controllers/puzzleController');

const router = express.Router();

//router.param('id', puzzleController.checkID);

router
  .route('/')
  .get(puzzleController.getAllPuzzles)
  .post(puzzleController.createPuzzle);
router
  .route('/:id')
  .get(puzzleController.getPuzzle)
  .patch(puzzleController.updatePuzzle)
  .delete(puzzleController.deletePuzzle);

module.exports = router;
