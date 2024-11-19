import { NextResponse } from "next/server";
import { connectDB } from "@/app/api/utils/database";
import Product from "@/app/api/models/Product";

export async function PATCH() {
  try {
    // Conectar a la base de datos
    await connectDB();

    // Actualizar todos los documentos para reemplazar `categoria` por `category`
    const result = await Product.updateMany(
      { categoria: { $exists: true } }, // Solo documentos que tienen `categoria`
      [
        {
          $set: {
            category: "$categoria", // Crear `category` con el valor de `categoria`
          },
        },
        {
          $unset: "categoria", // Eliminar la propiedad `categoria`
        },
      ],
    );

    // Retornar el resultado
    return new Response(
      JSON.stringify({
        message: "Categoría actualizada a category con éxito",
        matchedCount: result.matchedCount,
        modifiedCount: result.modifiedCount,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("Error actualizando categorías:", error);
    return new Response(
      JSON.stringify({ message: "Error actualizando categorías" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
