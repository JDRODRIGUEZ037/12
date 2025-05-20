// models/Product.js
const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true, // Asegura que los nombres de productos sean únicos
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        stock: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    {
        timestamps: true, // Añade campos createdAt y updatedAt automáticamente
    }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;