import { NextResponse } from "next/server";
import { connectDB } from "../../utils/database";
import Product from "../../models/Product";

export async function GET(request) {
    try {
        await connectDB();
        const products = await Product.find();
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