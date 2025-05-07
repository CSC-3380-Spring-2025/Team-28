import connectionToDatabase from "@/lib/mongoose"
import User from "@/models/user"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export async function POST(request: { json: () => PromiseLike<{ password: any; }> | { password: any; }; }){
    try{
        await connectionToDatabase()
        const {password} = await request.json()
        const hashPass = await bcrypt.hash(password, 10)
        await User.findOneAndUpdate({email: process.env.NEXT_PUBLIC_LOGGED_IN_USER}, {password: hashPass})
        return NextResponse.json({message: "email updated", status: 201})
    } catch(err) {
        console.log(err)
        return NextResponse.json({message: "uh oh errorrr", status: 500})
    }
}