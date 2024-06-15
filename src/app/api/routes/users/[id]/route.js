import { NextResponse } from "next/server";
import { connectDB } from "@/app/api/utils/database";
import User from '@/app/api/models/User'

export async function GET(request, { params }) {
    try {
        const foundUser = await User.findById(params.id);
        if (!foundUser) return NextResponse.json({
            message: 'User not found.'
        }, {
            status: 404
        });
        return NextResponse.json(foundUser);
    } catch (error) {
        return NextResponse.json(error.message, {
            status: 400
        })
    }
}

export async function PUT(request, { params }) {
    try {
        const data = await request.json();
        const updatedUser = await User.findByIdAndUpdate(params.id, data, {
            new: true
        })
        return NextResponse.json(updatedUser)
    } catch (error) {
        return NextResponse.json(error.message, {
            status: 400
        })
    }
}

export async function DELETE(request, { params }) {
    try {
        await User.findByIdAndDelete(params.id)
        return NextResponse.json({
            message: 'User deleted'
        });
    } catch (error) {
        return NextResponse.json(error.message, {
            status: 400
        })
    }
}