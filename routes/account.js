import express from 'express'
import * as account from '../src/account/account'
import { register } from '../src/account/register'
import { login } from '../src/account/login'

var router = express.Router()

router.get('/logout', account.logout)
router.post('/login', login)
router.post('/register', register)
router.get('/isConnected', account.connected)

export default router
