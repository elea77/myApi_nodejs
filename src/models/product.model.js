const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    img: {
        type: String,
        required: true,
        unique: true
    },
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }],
})

module.exports = mongoose.model('Product', productSchema);