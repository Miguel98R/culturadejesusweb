const express = require('express')
const router = express.Router()

let configController = require('../controllers/configurations.controller')


router.put('/createOrUpdateConf', configController.createOrUpdateConf)
router.post('/getKeysPasarelas', configController.getKeysPasarelas)
router.post('/updateOrCreateKey', configController.updateOrCreateKey)


router.post('/createOne', configController.createOne)
router.post('/datatable_aggregate', configController.datatable_aggregate)
router.put('/updateById/:id', configController.updateById)
router.delete('/findIdAndDelete/:id', configController.findIdAndDelete)
router.get('/getOneById/:id', configController.getOneById)
router.get('/getMany', configController.getMany)

router.post('/createMany', configController.createMany)
router.post('/aggregate', configController.aggregate)

router.get('/getOneWhere/one', configController.getOneWhere)


router.put('/findUpdateOrCreate', configController.findUpdateOrCreate)
router.put('/findUpdate', configController.findUpdate)


module.exports = router
