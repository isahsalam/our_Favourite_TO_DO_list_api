const express = require('express')
const { signUp, loginUser, verifyEmail, resendVerificationEmail, forgotPassword, changePassword, resetPassword, getAll, deleteUser, getOne, makeAdmin} = require('../controller/appsController')
const authenticator = require('../middleware/auth2')

const router = express.Router()

router.post('/sign-up', signUp)

router.post(`/log-in`, loginUser)

router.get(`/verify/:token`, verifyEmail)

router.post(`/resend-verification`, resendVerificationEmail)

router.post(`/forgot-password`, forgotPassword)

router.post(`/change-password/:token`, changePassword)

router.post(`/reset-password/:token`, resetPassword)

router.get(`/getone/:userId`, getOne)

router.get(`/getall`, authenticator, getAll)

router.get(`/make-admin/:userId`, makeAdmin)

router.delete(`/delete-user/:userId`, authenticator, deleteUser)

module.exports = router