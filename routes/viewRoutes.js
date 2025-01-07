const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

//router.get('/', viewsController.index);
//router.get('/tape', viewsController.getTape);
router.get('/tape/:id', viewsController.getTape);
module.exports = router;
