import { NextResponse } from "next/server";
import { connectDB } from "../../../utils/database";
import Product from "../../../models/Product";

export async function GET(request, context) {
  const { params } = context;
  if (params.id) {
    return getProductById(request, context);
  } else {
    return getProductsByCategory(request);
  }
}

async function getProductById(request, { params }) {
  connectDB();
  try {
    const foundProduct = await Product.findById(params.id);

    if (!foundProduct)
      return NextResponse.json({
        status: 404,
        message: "No se encontró el producto con el ID especificado.",
      });

    return NextResponse.json(foundProduct);
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: error.message,
    });
  }
}

// Función para obtener productos por categoría
async function getProductsByCategory(request) {
  connectDB();
  try {
    const { searchParams } = request.nextUrl.searchParams;
    const category = searchParams.get("categoria");

    let query = {};
    if (category) {
      query.categoria = category;
    }

    const foundProducts = await Product.find(query);

    if (!foundProducts.length)
      return NextResponse.json({
        status: 404,
        message: "No se encontraron productos con la categoría especificada.",
      });

    return NextResponse.json(foundProducts);
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: error.message,
    });
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const updatedProduct = await Product.findByIdAndUpdate(params.id, data, {
      new: true,
    });
    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function DELETE(request, { params }) {
  try {
    await Product.findByIdAndDelete(params.id);

    return NextResponse.json({
      status: 200,
      message: "Producto eliminado",
    });
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
