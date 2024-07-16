const express = require('express')
const router = express.Router()

let usersController = require('../controllers/users.controller')


router.post('/createAdmin', usersController.createAdmin)
router.post('/createUsers', usersController.createUsers)
router.post('/datatable_aggregate', usersController.datatable_aggregate)
router.post('/getUserDataEmail/:email', usersController.getUserDataEmail)
router.put('/updateById/:id', usersController.updateById)
router.delete('/findIdAndDelete/:id', usersController.findIdAndDelete)
router.get('/getOneById/:id', usersController.getOneById)



router.post('/createMany', usersController.createMany)
router.post('/aggregate', usersController.aggregate)
router.get('/getOneWhere/one', usersController.getOneWhere)
router.get('/getMany', usersController.getMany)
router.put('/findUpdateOrCreate', usersController.findUpdateOrCreate)
router.put('/findUpdate', usersController.findUpdate)





module.exports = router
