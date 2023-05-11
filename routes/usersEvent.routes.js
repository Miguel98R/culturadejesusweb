const json = require('body-parser/lib/types/json')
const express = require('express')
const router = express.Router()


let {newUser,getUsersEvent} = require('../controllers/usuariosEvent.controller')


//REGISTRO DEL USUARIO
router.post('/newUser', newUser)

//REGISTRO DEL USUARIO
router.post('/getUsersEvent', getUsersEvent)



module.exports = router
