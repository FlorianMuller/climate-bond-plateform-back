import express from 'express'
import account from './account'

var router = express.Router()

router.get('/', (req, res) => {
    console.log(req.session);
    res.send('Hello World!')
    })

router.use('/account', account)

export default router
