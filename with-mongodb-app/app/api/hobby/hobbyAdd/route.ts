import connectionToDatabase from "@/lib/mongoose"
import User from "@/models/user"
import { NextResponse } from "next/server"

export async function POST(request: { json: () => PromiseLike<{ hobby: String}> | {hobby: String} }){
    try{
        await connectionToDatabase()
        const {hobby} = await request.json()
        const x = await User.findOne({email: process.env.LOGGED_IN_USER})
        if (x.hobbies.length >= 3){
            return NextResponse.json({message: "max hobbies added", status: 201})
        }
        else if(x.hobbies.includes(hobby)){
            return NextResponse.json({message: "hobby already added", status: 201})
        }
        else{
            await User.findOneAndUpdate({email: process.env.LOGGED_IN_USER}, {$push: { hobbies: hobby }})
            return NextResponse.json({message: "hobby added", status: 201})
        }
    } catch(err) {
        console.log(err)
        return NextResponse.json({message: "uh oh errorrr", status: 500})
    }
}