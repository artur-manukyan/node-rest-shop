const mongoose = require('mongoose')
const Order = require('../models/order')
const Product = require('../models/product')

exports.create_order = (req, res, next) => {
    Product.findById(req.body.productID)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: req.body.productID + ' is not found'
                })
            }
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                productID: req.body.productID,
                quantity: req.body.quantity
            })
            return order.save()
        })
        .then(result => {
            console.log(result)
            res.status(201).json({
                message: 'created',
                order: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}

exports.list_orders = (req, res, next) => {
    Order.find()
        .select('productID quantity _id')
        .exec()
        .then(docs => {
            res.status(200).json({
                message: 'success',
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        _id: doc._id,
                        productID: doc.productID,
                        quantity: doc.quantity,
                        requests: [
                            {
                                type: 'GET',
                                url: 'http://localhost:3000/orders/' + doc._id
                            },
                            {
                                type: 'GET',
                                url: 'http://localhost:3000/products/' + doc.productID
                            }
                        ]
                    }
                })
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.get_order = (req, res, next) => {
    const id = req.params.orderID
    Order.findById(id)
        .exec()
        .then(order => {
            if (!order) {
                return res.status(400).json({
                    message: 'not found'
                })
            }
            res.status(200).json({
                message: 'success',
                order
            })
        })
        .catch()
}

exports.update_order = (req, res, next) => {
    const id = req.params.orderID
    Order.findById(id)
        .exec()
        .then()
        .catch()
}

exports.delete_order = (req, res, next) => {
    const id = req.params.orderID
    Order.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: result.deletedCount ? 'removed' : ' ',
                id: id,
                result: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}
