const json = require('body-parser/lib/types/json')
const express = require('express')
const router = express.Router()


let {newUser} = require('../controllers/usuariosEvent.controller')


//REGISTRO DEL USUARIO
router.post('/newUser', newUser)




module.exports = router
