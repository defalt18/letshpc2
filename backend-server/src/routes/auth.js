const express = require('express')
const { signUp, signIn, signOut, updateProfile } = require('../controller/auth')
const {
	validateSignUpRequest,
	isRequestValidated,
	validateSignInRequest,
	validateUpdateRequest
} = require('../validators/auth')
const router = express.Router()

router.post('/signup', validateSignUpRequest, isRequestValidated, signUp)
router.post(
	'/updateProfile',
	validateUpdateRequest,
	isRequestValidated,
	updateProfile
)
router.post('/signin', validateSignInRequest, isRequestValidated, signIn)
router.post('/signout', signOut)

module.exports = router
