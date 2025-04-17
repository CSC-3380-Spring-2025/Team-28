import connectionToDatabase from "@/lib/mongoose"
import Blog from "@/models/blog"
import { NextResponse } from "next/server"

export async function POST(request: { json: () => PromiseLike<{ title: String; date: String; content: String; image: String }> | 
                                                              { title: String; date: String; content: String; image: String } }) 
{
    try{
        connectionToDatabase()
        const {title, date, content, image} = await request.json()
        const newBlog = new Blog({title, date, content, image})
        await newBlog.save()
        return NextResponse.json({message: "blog post created", status: 201})
        
    } catch(err){
        return NextResponse.json({error: "error in server", status: 500})
    }
}