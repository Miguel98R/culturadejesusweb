const express = require('express')
const router = express.Router()

let salesController = require('../controllers/sales.controller')


router.post('/createSaleTransfer', salesController.createSaleTransfer)
router.post('/datatable_aggregate', salesController.datatable_aggregate)
router.post('/sendNotification', salesController.sendNotification)
router.put('/updateById/:id', salesController.updateById)
router.put('/updatePayementTransfer/:id', salesController.updatePayementTransfer)
router.put('/updateStatusSendSale/:id', salesController.updateStatusSendSale)
router.put('/upateSaleToHistoricStatus/:id', salesController.upateSaleToHistoricStatus)
router.put('/upateSendToSaleStatus/:id', salesController.upateSendToSaleStatus)
router.delete('/findIdAndDelete/:id', salesController.findIdAndDelete)
router.get('/getOneById/:id', salesController.getOneById)
router.get('/getDetailsSale/:id', salesController.getDetailsSale)
router.get('/getMany', salesController.getMany)


router.post('/createMany', salesController.createMany)
router.post('/aggregate', salesController.aggregate)
router.get('/getOneWhere/one', salesController.getOneWhere)
router.put('/findUpdateOrCreate', salesController.findUpdateOrCreate)
router.put('/findUpdate', salesController.findUpdate)


module.exports = router
