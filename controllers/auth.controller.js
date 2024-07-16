let usersModel = require('../models/users.model')

let ms = require('../helpers/apiato.helper')
const {encrypt, compare} = require('../helpers/handleBcrypt')


//APIATO CONFIGURE
let validationObject = {}
let populationObject = false
let options = {}
let aggregate_pipeline_dt = []
let aggregate_pipeline = []


module.exports = {
    loginSesion: async (req, res) => {
        let {user_name, password} = req.body

        try {

            // Buscar si ya existe un usuario con el mismo correo electrónico o nombre de usuario
            let searchUser = await usersModel.findOne({$or: [{email: user_name}, {user_name: user_name}]}).select(['user_name', 'name', 'password', 'usersTypes','active']).lean()


            if (!searchUser) {
                res.redirect('/cjPanel?message_error=Usuario incorrecto')
                return 0
            }

            let checkPassword = await compare(password, searchUser.password)
            if (!checkPassword) {
                res.redirect('/cjPanel?message_error=Contraseña incorrecta')
                return 0
            }


            req.session.regenerate(function (err) {
                if (err) {
                    res.redirect('/cjPanel?message_error=Error al iniciar sesion')
                    return
                }
                req.session.user = searchUser

                req.session.save(function (err) {
                    if (err) {
                        res.redirect('/cjPanel?message_error=Error al iniciar sesion')
                        return
                    }
                    res.redirect('/panel')
                })
            })

        } catch (e) {
            console.error(e)
            res.status(500).json({
                success: false,
                error: e

            })
        }
    },
    logout: async (req, res, next) => {

        req.session.user = null
        req.session.save(function (err) {
            if (err) next(err)

            req.session.regenerate(function (err) {
                if (err) next(err)
                res.redirect('/cjPanel')
            })
        })
    },


}
