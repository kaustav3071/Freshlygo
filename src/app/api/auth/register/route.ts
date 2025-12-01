import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToDB from "@/lib/db";
import UserModel from "@/models/user.model";

export async function POST(req:NextRequest)
{
    try
    {
        await connectToDB();
        const { name,email,password } = await req.json();
        if (!name || !email || !password )
        {
            return NextResponse.json(
                {message:"All fields are required"},
                {status:400});
        }
        if (password.length < 6)
        {
            return NextResponse.json(
                {message:"Password must be at least 6 characters long"},
                {status:400});
        }
        const user = await UserModel.findOne({email});
        if (user)
        {
            return NextResponse.json(
                {message:"User already exists"},
                {status:400});
        }
        const hashedPassword  = await bcrypt.hash(password,15);
        const newUser = await UserModel.create({name,email,password:hashedPassword});
        return NextResponse.json(
            {message:"User created successfully",user:newUser},
            {status:200});
    }
    catch (error)
    {
        return NextResponse.json(
            {message:`Internal Server Error : ${error}`},
            {status:500});
    }
} 