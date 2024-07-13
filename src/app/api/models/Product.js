import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    categoria: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    marca: {
        type: String,
        required: true
    },
    caracteristicas:  {
        type: Array,
        required: false
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
