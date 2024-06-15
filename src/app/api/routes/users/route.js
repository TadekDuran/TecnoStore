import { NextResponse } from "next/server";
import {connectDB} from "@/app/api/utils/database"
import User from "@/app/api/models/User"

export async function GET() {
    try {
        await connectDB();
        const users = await User.find();
        return new Response(JSON.stringify(users), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}