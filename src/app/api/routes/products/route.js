import { NextResponse } from "next/server";
import { connectDB } from "../../utils/database";
import Product from "../../models/Product";

export async function GET(request) {
  try {
    await connectDB();
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get("categoria");
    const marca = searchParams.get("marca");
    const precioMin = searchParams.get("precioMin");
    const precioMax = searchParams.get("precioMax");
    let query = {};
    if (category) query.categoria = category;
    if (marca) query.marca = marca;
    if (precioMin) query.precio = { ...query.precio, $gte: parseInt(precioMin) };
    if (precioMax) query.precio = { ...query.precio, $lte: parseInt(precioMax) };
    const products = await Product.find(query);
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
export async function POST(request) {
  try {
    const data = await request.json();
    const newProduct = new Product(data);
    const savedProduct = await newProduct.save();
    console.log(savedProduct);
    return NextResponse.json(savedProduct);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function getData(category) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/routes/products?categoria=${category}`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching filtered data:", error);
    throw error;
  }
}