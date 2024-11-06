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
        stock: {
            type: Boolean,
            default: true
        },
        imagen: {
            type: Array,
            required: false
        }
    },
    {
        timestamps: true,
    },
);

ProductSchema.post("save", async function () {
    const baseModelo = this.modelo.replace(/\b\d+(GB|TB|MB|RAM)\b/g, '').trim(); // El modelo base sin características
    const productosConMismoModelo = await mongoose.model("Product").aggregate([
        { $match: { modelo: { $regex: `^${baseModelo}` }, categoria: this.categoria } },
        {
            $group: {
                _id: null,
                productos: { $push: "$$ROOT" },
                count: { $sum: 1 },
            },
        },
        { $match: { count: { $gt: 1 } } }, // Solo si hay más de un producto con el mismo modelo base
    ]);

    if (productosConMismoModelo.length > 0) {
        const grupoProductos = productosConMismoModelo[0].productos;

        // Identificar todas las características comunes entre los productos
        const todasLasCaracteristicas = grupoProductos[0].caracteristicas.map(
            (caracteristica) => caracteristica.nombre
        );

        const caracteristicasUnicas = todasLasCaracteristicas.filter((nombreCaracteristica) => {
            const valoresCaracteristica = grupoProductos.map((producto) => {
                const caracteristica = producto.caracteristicas.find(
                    (caract) => caract.nombre === nombreCaracteristica
                );
                return caracteristica ? caracteristica.valor : null;
            });
            return new Set(valoresCaracteristica).size > 1; // Solo características con más de un valor
        });

        // Actualizar el modelo de cada producto con las características únicas
        for (const producto of grupoProductos) {
            const valoresUnicos = caracteristicasUnicas.map((nombreCaracteristica) => {
                const caracteristica = producto.caracteristicas.find(
                    (caract) => caract.nombre === nombreCaracteristica
                );
                return caracteristica ? caracteristica.valor : "";
            });

            const nuevoModelo = `${baseModelo} ${valoresUnicos.filter(Boolean).join(" / ")}`;

            // Si el modelo no contiene las características únicas, actualizamos el producto
            if (producto.modelo !== nuevoModelo && valoresUnicos.some(Boolean)) {
                await mongoose.model("Product").updateOne(
                    { _id: producto._id },
                    { $set: { modelo: nuevoModelo } }
                );
            }
        }
    }
});

let Product;

try {
    Product = mongoose.model("Product");
} catch {
    Product = mongoose.model("Product", ProductSchema);
}

export default Product;
