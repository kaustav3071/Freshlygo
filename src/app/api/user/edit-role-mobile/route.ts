import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import UserModel from "@/models/user.model";

export async function POST(request: NextRequest) {
    try{
        await connectDB();
        const { role,mobile } = await request.json();
        const session = await auth();
        const user = await UserModel.findOneAndUpdate({email:session?.user?.email},
            {role,mobile},
            {new:true})
        if(!user)
        {
            return NextResponse.json({ error: "User not found" }, { status: 400 });
        }
        return NextResponse.json(user,{status:200})

    }
    catch(error)
    {
        console.error("Error editing user role:", error);
        return NextResponse.json({ error: "Failed to edit user role" }, { status: 500 });
    }
}