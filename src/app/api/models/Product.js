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
        }
    },
    {
        timestamps: true,
    },
);

ProductSchema.post('save', async function () {
    const productosConMismoModelo = await mongoose.model("Product").aggregate([
        { $match: { modelo: this.modelo, categoria: this.categoria } },
        {
            $group: {
                _id: "$modelo",
                productos: { $push: "$$ROOT" },
                count: { $sum: 1 }
            }
        },
        { $match: { count: { $gt: 1 } } }
    ]);

    if (productosConMismoModelo.length > 0) {
        const grupoProductos = productosConMismoModelo[0].productos;

        const caracteristicasComunes = grupoProductos[0].caracteristicas.map(
            (caracteristica) => caracteristica.nombre
        );

        const caracteristicaUnica = caracteristicasComunes.find((nombreCaracteristica) => {
            const valoresCaracteristica = grupoProductos.map((producto) => {
                const caracteristica = producto.caracteristicas.find(
                    (caract) => caract.nombre === nombreCaracteristica
                );
                return caracteristica ? caracteristica.valor : null;
            });
        });

        if (caracteristicaUnica) {
            for (const producto of grupoProductos) {
                const caracteristicaValor = producto.caracteristicas.find(
                    (caract) => caract.nombre === caracteristicaUnica
                ).valor;

                const nuevoModelo = `${producto.modelo} ${caracteristicaValor}`;

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
