const express = require('express')
const router = express.Router()

let productsController = require('../controllers/products.controller')



router.post('/createOne', productsController.createOne)
router.post('/datatable_aggregate', productsController.datatable_aggregate)
router.put('/updateById/:id', productsController.updateById)
router.delete('/findIdAndDelete/:id', productsController.findIdAndDelete)
router.get('/getOneById/:id', productsController.getOneById)
router.get('/getMany', productsController.getMany)

router.post('/createMany', productsController.createMany)
router.post('/aggregate', productsController.aggregate)

router.get('/getOneWhere/one', productsController.getOneWhere)


router.put('/findUpdateOrCreate', productsController.findUpdateOrCreate)
router.put('/findUpdate', productsController.findUpdate)





module.exports = router
