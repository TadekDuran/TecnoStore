import { NextResponse } from "next/server";
import { connectDB } from "@/app/api/utils/database";

export const dynamic = 'force-dynamic' // defaults to auto
 
export async function GET(request) {
  await connectDB();
  return new NextResponse("MongoDB connected", {
    status: 200,
  })
}