import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import uploadOnCloudinary from "@/lib/cloudinary";
import Grocery from "@/models/grocery.model";

export async function POST(request: NextRequest) {
    try {
        connectDB();
        const session = await auth();
        if (!session?.user || session.user.role !== 'admin') {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const formData = await request.formData();
        const name = formData.get('name') as string | undefined;
        const category = formData.get('category') as string | undefined;
        const price = formData.get('price') as string | undefined;
        const unit = formData.get('unit') as string | undefined;
        const file = formData.get('image') as Blob | undefined;

        if (!name || !category || !price || !unit || !file) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const imageUrl = await uploadOnCloudinary(file);

        if (!imageUrl) {
            return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
        }

        const newGrocery = await Grocery.create({
            name,
            category,
            price,
            unit,
            image: imageUrl
        });
        return NextResponse.json({ message: "Grocery added successfully" }, { status: 201 });
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

}