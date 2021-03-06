const router = require('express').Router()
const Controller = require('../controllers/order.js')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.get('/', Controller.findAll)
router.put('/checkStock', Controller.checkStock)
router.put('/:OrderId/checkOut', Controller.checkOut)
router.put('/updateStock', Controller.updateStock)

module.exports = router