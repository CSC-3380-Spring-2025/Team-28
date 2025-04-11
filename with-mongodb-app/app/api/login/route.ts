import connectionToDatabase from "@/lib/mongoose"
import User from "@/models/user"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"

export async function POST(request: { json: () => PromiseLike<{ name: any; email: any; password: any }> | { name: any; email: any; password: any } }) {
    try{
        connectionToDatabase()
        const {email, password} = await request.json()
        const userExist = await User.findOne({email})
        if(!userExist){
            return NextResponse.json({error: "user does not exist"})
        }
        const checkPass = await bcrypt.compare(password, userExist.password)
        if(!checkPass){
            return NextResponse.json({message: "wrong pass", status: 404})
        }
        process.env.LOGGED_IN_USER = email
        return NextResponse.json({message: "user logged in", status: 201})
        
    } catch(err){
        return NextResponse.json({error: "error in server", status: 500})
    }
}