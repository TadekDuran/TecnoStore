import { NextResponse } from "next/server";
import { connectDB } from "@/app/api/utils/database";

export async function GET() {
  await connectDB();
  return NextResponse.json({
    message: "MongoDB connected",
  });
}