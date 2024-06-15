import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    modelo: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    fabricante: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
})

let Product;

try {
    Product = mongoose.model('Product');
} catch {
    Product = mongoose.model('Product', ProductSchema);
}

export default Product;