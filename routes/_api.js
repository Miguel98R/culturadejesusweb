const express = require('express')
const router = express.Router()

router.use('/matrimonios', require('./matrimonios.routes'))
router.use('/invitados', require('./invitados.routes'))

module.exports = router