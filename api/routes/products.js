const express = require('express')
const router = express.Router()
const multer = require('multer')
const check_auth = require('../middleware/check-auth')
const products_controller = require('../controllers/products')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + '_' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/svg') {
        cb(null, true)
    } else {
        cb(new Error('unsupported file format'), false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileFilter
})

router.post('/', check_auth, upload.single('productImage'), products_controller.create_product)

router.get('/', products_controller.list_products)

router.get('/:productID', products_controller.get_product)

router.patch('/:productID', check_auth, products_controller.update_product)

router.delete('/:productID', check_auth, products_controller.delete_product)

module.exports = router
