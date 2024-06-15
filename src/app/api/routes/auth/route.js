import User from "../../models/User";
import { connectDB } from "../../utils/database";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectDB();
        const data = await req.json();
        const newUser = new User(data);
        const savedUser = await newUser.save();
        console.log(savedUser);
        return NextResponse.json(savedUser);
    } catch (error) {
        return NextResponse.json(error.message, {
            status: 400,
        });
    }
}
