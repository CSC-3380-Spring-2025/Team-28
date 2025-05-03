import connectionToDatabase from "@/lib/mongoose"
import User from "@/models/user"
import { NextResponse } from "next/server"

export async function POST(request: { json: () => PromiseLike<{ email: any; }> | { email: any; }; }){
    try{
        await connectionToDatabase()
        const {email} = await request.json()
        await User.findOneAndUpdate({email: email}, {email: email})
        return NextResponse.json({message: "email updated", status: 201})
    } catch(err) {
        console.log(err)
        return NextResponse.json({message: "uh oh errorrr", status: 500})
    }
}