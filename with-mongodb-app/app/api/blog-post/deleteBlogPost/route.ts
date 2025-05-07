import connectionToDatabase from "@/lib/mongoose"
import Blog from "@/models/blog"
import { NextResponse } from "next/server"

export async function POST(request: { json: () => PromiseLike<{ id: any }> | { id: any } }){
    try{
        //Connect to MongoDB
        await connectionToDatabase()
        const {id} = await request.json()
        await Blog.findByIdAndDelete({_id: id})
        return NextResponse.json({message: "Post deleted!", status: 201})
    } catch(err) {
        console.log(err)
        return NextResponse.json({message: "uh oh errorrr", status: 500})
    }
}