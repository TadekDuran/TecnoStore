import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        categoria: {
            type: String,
            required: true,
        },
        modelo: {
            type: String,
            required: true,
        },
        precio: {
            type: Number,
            required: true,
        },
        fabricante: {
            type: String,
            required: true,
        },
        caracteristicas: {
            type: Array,
            required: false,
        },
        destacado: {
            type: Boolean,
            required: false,
            default: false,
        },
        stock:  {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
    },
);

let Product;

try {
    Product = mongoose.model("Product");
} catch {
    Product = mongoose.model("Product", ProductSchema);
}

export default Product;
