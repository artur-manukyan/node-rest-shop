const mongoose = require('mongoose')
const Product = require('../models/product')

exports.create_product = (req, res, next) => {
    console.log(req.file)
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        image: req.file.path
    })
    product.save()
        .then(result => {
            console.log(result)
            res.status(201).json({
                message: 'success',
                product: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}

exports.list_products = (req, res, next) => {
    Product.find()
        .select('_id name price image')
        .exec()
        .then(docs => {
            console.log(docs)
            const response = {
                message: 'success',
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        price: doc.price,
                        image: doc.image,
                        request: {
                            method: 'GET',
                            url: 'http://localhost:3000/products/' + doc._id
                        }

                    }
                })

            }
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.get_product = (req, res, next) => {
    const id = req.params.productID
    Product.findById(id)
        .select('_id name price image')
        .exec()
        .then(doc => {
            console.log(doc)
            if (doc) {
                res.status(200).json(
                    {
                        message: 'success',
                        product: doc
                    }
                )
            } else {
                res.status(404).json(
                    {
                        message: 'No product found for provided ID'
                    }
                )
            }

        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        })
}

exports.update_product = (req, res, next) => {
    const id = req.params.productID
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    Product.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json({
                product: result
            })
        })
        .catch(err => {
            console.log(error).json({
                error: err
            })
        })
}

exports.delete_product = (req, res, next) => {
    const id = req.params.productID
    Product.remove({ _id: id })
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: 'removed',
                id: id,
                result: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
}
