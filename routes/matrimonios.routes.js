const express = require('express')
const router = express.Router()

let matrimonioController = require('../controllers/matrimonios.controller')


router.post('/createMatrimonio', matrimonioController.createMatrimonio)



router.post('/createOne', matrimonioController.createOne)
router.post('/createMany/many', matrimonioController.createMany)

router.get('/getOneWhere/one', matrimonioController.getOneWhere)
router.get('/getOneById/:id', matrimonioController.getOneById)
router.get('/getMany', matrimonioController.getMany)

router.put('/findUpdateOrCreate/find_update_or_create', matrimonioController.findUpdateOrCreate)
router.put('/findUpdate/find_where_and_update', matrimonioController.findUpdate)
router.put('/updateById/:id', matrimonioController.updateById)

router.delete('/findIdAndDelete/:id', matrimonioController.findIdAndDelete)

router.post('/findIdAndDelete/datatable', matrimonioController.datatable_aggregate)
router.post('/aggregate/aggregate', matrimonioController.aggregate)

module.exports = router
