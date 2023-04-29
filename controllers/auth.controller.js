const usuariosModel = require('../models/usuarios.model')

const {encrypt, compare} = require('../helpers/handleBcrypt')
const {tokenSign} = require('../helpers/generateToken')


let login_user = async function (req, res) {

    let {user, password} = req.body


    try {

        let user_data = await usersModel.findOne({user}).lean()

        if (!user_data) {
            res.status(404).json({
                code: 404,
                success: false,
                message: 'Usuario incorrecto'
            })
            return 0
        }

        let checkPassword = await compare(password, user_data.password)
        let tokenSession = await tokenSign(user_data)


        if (checkPassword) {

            res.status(200).json({
                code: 200,
                success: true,
                data: user_data,
                tokenSession

            })


        } else {

            res.status(403).json({
                code: 403,
                success: false,
                message: 'Contraseña incorrecta'
            })
            return 0


        }

    } catch (e) {
        console.log(e)
        res.status(500).json({
            success: false,
            error: e
        })
        return 0
    }

}

let registrer_user = async function (req, res) {

    let {user, password, rol} = req.body

    try {

        let passwordHash = await encrypt(password)


        let new_user = new usersModel({

            user: user,
            password: passwordHash,
            rol: rol

        })



        new_user = await new_user.save()


        res.status(200).json({
            success: true,
            data: new_user,
            message:'Usuario creado'
        })

    } catch (e) {

        console.log(e)
        res.status(500).json({
            success: false,
            error: e
        })

        return 0

    }


}

let verify = async function (req, res) {
    try {
        //console.log('DESDE VERIFY ', req.user)
      
        res.status(200).json({
            status: 200,
            success: true,
            data: req.user
        })

    } catch (e) {

        console.error(e)
        res.status(500).json({
            error: e,
            message:e
        })
    }

}

module.exports = {registrer_user, login_user, verify}
