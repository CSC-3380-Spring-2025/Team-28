import connectionToDatabase from "@/lib/mongoose"
import User from "@/models/user"
import { NextResponse } from "next/server"

export async function POST(request: { json: () => PromiseLike<{ hobby: String; tracker: String}> | {hobby: String; tracker: String} }){
    try{
        await connectionToDatabase()
        const {hobby, tracker} = await request.json()
        const x = await User.findOne({email: process.env.LOGGED_IN_USER})
        if (x.pages.includes((hobby + "/" + tracker))){
            return NextResponse.json({message: "path already exists !!", status: 201})
        }
        //add something to validate hobby existance
        //add something to validate path existance
        //lowkey don't need 
        else{
            await User.findOneAndUpdate({email: process.env.LOGGED_IN_USER}, { $push: {pages: (hobby + "/" + tracker)} })
            return NextResponse.json({message: "path added", status: 201})
        }
    } catch(err) {
        console.log(err)
    }
}