const express = require('express')
const router = express.Router()

let authController = require('../controllers/auth.controller')


// INICIAR SESION DE USUSARIOS
router.post('/loginSesion', authController.loginSesion)

// CERRAR SESION
router.get('/logout', authController.logout)



module.exports = router
