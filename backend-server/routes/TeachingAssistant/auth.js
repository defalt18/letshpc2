const express = require('express')
const {
	signUp,
	signIn,
	signOut,
	getAllUser
} = require('../controller/TeachingAssistant/auth')
const {
	validateSignUpRequest,
	isRequestValidated,
	validateSignInRequest
} = require('../validators/auth')
const router = express.Router()

router.get('/TA/alluser', getAllUser)
router.post('/TA/signup', validateSignUpRequest, isRequestValidated, signUp)
router.post('/TA/signin', validateSignInRequest, isRequestValidated, signIn)
router.post('/TA/signout', signOut)

module.exports = router
