import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
        },
        model: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        maker: {
            type: String,
            required: true,
        },
        features: {
            type: Array,
            required: false,
        },
        highlight: {
            type: Boolean,
            required: false,
            default: false,
        },
        stock: {
            type: Boolean,
            default: true
        },
        image: {
            type: Array,
            required: false
        }
    },
    {
        timestamps: true,
    },
);

ProductSchema.post("save", async function () {
    const baseModel = this.model.replace(/\b\d+(GB|TB|MB|RAM)\b/g, '').trim(); // El model base sin características
    const productosConMismoModelo = await mongoose.model("Product").aggregate([
        { $match: { model: { $regex: `^${baseModel}` }, category: this.category } },
        {
            $group: {
                _id: null,
                productos: { $push: "$$ROOT" },
                count: { $sum: 1 },
            },
        },
        { $match: { count: { $gt: 1 } } }, // Solo si hay más de un producto con el mismo model base
    ]);

    if (productosConMismoModelo.length > 0) {
        const grupoProductos = productosConMismoModelo[0].productos;

        // Identificar todas las características comunes entre los productos
        const todasLasCaracteristicas = grupoProductos[0].features.map(
            (feature) => feature.name
        );

        const caracteristicasUnicas = todasLasCaracteristicas.filter((featureName) => {
            const valoresCaracteristica = grupoProductos.map((producto) => {
                const feature = producto.features.find(
                    (feature) => feature.name === featureName
                );
                return feature ? feature.value : null;
            });
            return new Set(valoresCaracteristica).size > 1; // Solo características con más de un value
        });

        // Actualizar el model de cada producto con las características únicas
        for (const producto of grupoProductos) {
            const uniqueValues = caracteristicasUnicas.map((featureName) => {
                const feature = producto.features.find(
                    (feature) => feature.name === featureName
                );
                return feature ? feature.value : "";
            });

            const newModel = `${baseModel} ${uniqueValues.filter(Boolean).join(" / ")}`;

            // Si el model no contiene las características únicas, actualizamos el producto
            if (producto.model !== newModel && uniqueValues.some(Boolean)) {
                await mongoose.model("Product").updateOne(
                    { _id: producto._id },
                    { $set: { model: newModel } }
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
