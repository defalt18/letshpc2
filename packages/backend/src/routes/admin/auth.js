const express = require('express');
const { signUp, signIn, signOut, getAllUser } = require('../../controller/admin/auth');
const {
  validateSignUpRequest,
  isRequestValidated,
  validateSignInRequest,
} = require('../../validators/auth');
const router = express.Router();

router.get('/admin/alluser', getAllUser);
router.post('/admin/signup', validateSignUpRequest, isRequestValidated, signUp);
router.post('/admin/signin', validateSignInRequest, isRequestValidated, signIn);
router.post('/admin/signout', signOut);

module.exports = router;
