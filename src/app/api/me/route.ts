import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import  User  from "@/models/user.model"

export async function GET(request:NextRequest) {
    try{
        const session = await auth();
        if(!session || !session.user)
        {
            return NextResponse.json(
                {message: "Unauthorized"},
                {status:401}
            );
        }
        const user = await User.findOne({email:session.user.email}).select
        ("-password");
        if (!user){
            return NextResponse.json(
                {message: "User not found"},
                {status:404}
            );
        }
        return NextResponse.json(user);
    }   
    catch(error:any)
    {
        return NextResponse.json(
            {message: `Internal Server Error ${error}`},
            {status:500}
        );
    } 
}