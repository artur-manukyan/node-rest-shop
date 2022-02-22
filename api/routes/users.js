const express = require('express')
const router = express.Router()
const check_auth = require('../middleware/check-auth')
const users_controller = require('../controllers/users')

router.post('/signup', users_controller.signup)

router.post('/login', users_controller.login)

router.delete('/:userID', check_auth, users_controller.delete)

module.exports = router
