import { NextResponse } from "next/server";
import { connectDB } from "@/app/api/utils/database";
import Product from "@/app/api/models/Product";

export async function PATCH() {
  try {
    // Conectar a la base de datos
    await connectDB();

    // Actualizar todos los documentos para reemplazar `imagen` por `image`
    const result = await Product.updateMany(
      { imagen: { $exists: true } }, // Solo documentos que tienen `imagen`
      [
        {
          $set: {
            image: "$imagen", // Crear `image` con el valor de `imagen`
          },
        },
        {
          $unset: "imagen", // Eliminar la propiedad `imagen`
        },
      ],
    );

    // Retornar el resultado
    return new Response(
      JSON.stringify({
        message: "imagen actualizada a image con éxito",
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
    console.error("Error actualizando imagen:", error);
    return new Response(
      JSON.stringify({ message: "Error actualizando imagen" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
