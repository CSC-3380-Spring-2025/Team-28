import connectionToDatabase from "@/lib/mongoose"
import User from "@/models/user"
import { NextResponse } from "next/server"

export async function POST(request: { json: PromiseLike<{ email: any; }> | { email: any; }; }){
    try{
        await connectionToDatabase()
        const {email} = await request.json;
        console.log(email);
        await User.deleteOne({email: email})
        return NextResponse.json({message: "account go byebye", status: 201})
    } catch(err) {
        console.log(err)
        return NextResponse.json({message: "uh oh errorrr", status: 500})
    }
}