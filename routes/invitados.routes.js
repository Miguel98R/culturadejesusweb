const express = require('express')
const router = express.Router()

let invitadosController = require('../controllers/invitados.controller')


router.post('/createInvitado', invitadosController.createInvitado)



router.post('/createOne', invitadosController.createOne)
router.post('/createMany/many', invitadosController.createMany)

router.get('/getOneWhere/one', invitadosController.getOneWhere)
router.get('/getOneById/:id', invitadosController.getOneById)
router.get('/getMany', invitadosController.getMany)

router.put('/findUpdateOrCreate/find_update_or_create', invitadosController.findUpdateOrCreate)
router.put('/findUpdate/find_where_and_update', invitadosController.findUpdate)
router.put('/updateById/:id', invitadosController.updateById)

router.delete('/findIdAndDelete/:id', invitadosController.findIdAndDelete)

router.post('/findIdAndDelete/datatable', invitadosController.datatable_aggregate)
router.post('/aggregate/aggregate', invitadosController.aggregate)

module.exports = router
