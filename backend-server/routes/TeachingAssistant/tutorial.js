const express = require('express')
const {
	editTutorial,
	createTutorial,
	deleteTutorialById
} = require('../controller/TeachingAssistant/tutorial')
const router = express.Router()

router.post('/TA/tutorial/create', createTutorial)
router.post('/TA/tutorial/edit/:id', editTutorial)
router.delete('/TA/tutorialById', deleteTutorialById)

module.exports = router
