const express = require('express')
const router = express.Router()
const check_auth = require('../middleware/check-auth')
const orders_controller = require('../controllers/orders')

router.post('/', check_auth, orders_controller.create_order)

router.get('/', check_auth, orders_controller.list_orders)

router.get('/:orderID', check_auth, orders_controller.get_order)

// PATCH rout is missing since editing a placed order is not supported

router.delete('/:orderID', check_auth, orders_controller.delete_order)

module.exports = router
