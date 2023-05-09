let usuariosEventModel = require ('../models/usuariosEvent.model')

let newUser = async function(req,res){
    let body = req.body
    console.log(body)

    try{

       let newUser = new usuariosEventModel({

           nombre : body.nombre,
           apellido : body.apellido,
           edad : body.edad,
           phone : body.phone,
           congregacion : body.congregacion,
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




module.exports = {newUser}
