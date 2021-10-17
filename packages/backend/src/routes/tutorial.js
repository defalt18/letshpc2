const express = require('express');
const { getAllTutorials, getTutorial, delTutorial } = require('../controller/tutorial');
const router = express.Router();

router.get('/tutorial', getAllTutorials);
router.delete('/tutorial', delTutorial);
router.get('/tutorial/:id', getTutorial);

module.exports = router;
