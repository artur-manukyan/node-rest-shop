const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }
})

module.exports = mongoose.model('Product', productSchema)
// new lines of code added
// artur's edits
// artur's edits 2
// artur's edits 3
