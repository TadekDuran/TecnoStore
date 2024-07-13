import { NextResponse } from "next/server";
import { connectDB } from "../../../utils/database";
import Product from "../../../models/Product";

export async function GET(request, context) {
  const { params } = context;
  if (params.id) {
    return NextResponse.json(await Product.findById(params.id));
  } else {
    return NextResponse.json({
      status: 404,
      message: "No se encontró el producto con el ID especificado.",
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
