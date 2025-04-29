import connectionToDatabase from "@/lib/mongoose"
import Hobby from "@/models/hobby"
import User from "@/models/user"
import { NextResponse } from "next/server"

export async function POST(request: { json: () => PromiseLike<{ hobby: String; tracker: String}> | {hobby: String; tracker: String} }){
    try{
        await connectionToDatabase()
        const {hobby, tracker} = await request.json()
        if (await User.find({email: process.env.LOGGED_IN_USER}, { pages: (hobby + "/" + tracker) } )){
            User.findOneAndUpdate({email: process.env.LOGGED_IN_USER}, { $pull: {pages: (hobby + "/" + tracker)} })
            
        }
        else{
            return NextResponse.json({message: "path does not already exist !!", status: 201})
        }
    } catch(err) {
        console.log(err)
    }
}