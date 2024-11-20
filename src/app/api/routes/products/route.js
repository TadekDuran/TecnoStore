import { NextResponse } from "next/server";
import { connectDB } from "../../utils/database";
import Product from "../../models/Product";

export async function GET(request) {
  try {
    await connectDB();
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const maker = searchParams.get("maker");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const featureName = searchParams.getAll("featureName");
    const featureValue = searchParams.getAll("featureValue");
    const highlight = searchParams.get("highlight")
    const model = searchParams.get("model");
    const currentPage = searchParams.get("currentPage");
    const limit = searchParams.get("amountProducts");
    let query = {};
    if (category)
      query.category = category;
    if (maker)
      query.maker = maker;
    if (minPrice)
      query.price = { ...query.price, $gte: parseInt(minPrice) };
    if (maxPrice)
      query.price = { ...query.price, $lte: parseInt(maxPrice) };
    if (featureName.length && featureValue.length) {
      query.features = {
        $all: featureName.map((name, index) => ({
          $elemMatch: {
            name: name,
            value: featureValue[index]
          }
        }))
      };
    }
    if (highlight)
      query.highlight = highlight;
    if (model)
      query.model = { $regex: model, $options: "i" };

    const totalProducts = await Product.find(query);
    const totalPages = Math.ceil(totalProducts.length / limit)
    const filteredProducts = await Product.find(query).skip((currentPage - 1) * limit).limit(limit).sort({ "price": -1 });

    return new Response(JSON.stringify({ totalPages: Number(totalPages), currentPage: Number(currentPage), products: filteredProducts }), {
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
    return NextResponse.json(savedProduct);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function getData(queries) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/routes/products?${queries}`,
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching filtered data:", error);
    throw error;
  }
}

export async function getHighlights() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/routes/products?highlight=true`,
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching filtered data:", error);
    throw error;
  }
}