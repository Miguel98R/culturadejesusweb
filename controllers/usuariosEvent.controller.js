let usuariosEventModel = require ('../models/usuariosEvent.model')

let newUser = async function(req,res){
    let body = req.body
    console.log(body)

    try{

        let existUser = await usuariosEventModel.findOne({email:body.email})

        if(existUser){
            res.status(400).json({
                success:false,
                message:"Este usuario ya esta registrado"
            })

            return
        }


       let newUser = new usuariosEventModel({

           nombre : body.nombre,
           apellido : body.apellido,
           edad : body.edad,
           phone : body.phone,
           congregacion : body.congregacion,
           email : body.email,
       })

        await newUser.save()



        res.status(200).json({
            success:true
        })
    }catch (e) {
        console.error(e)
        res.status(500).json({
            success:false,
            error:e
        })
    }
}

let getUsersEvent = async function(req,res){


    try{
        let users = await usuariosEventModel.find()

        res.status(200).json({
            success:true,
            data:users
        })
    }catch (e) {
        console.error(e)
        res.status(500).json({
            success:true,
            data:users
        })
    }
}



module.exports = {newUser,getUsersEvent}
