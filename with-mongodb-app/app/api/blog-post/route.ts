import connectionToDatabase from "@/lib/mongoose"
import Blog from "@/models/blog"
import { NextResponse } from "next/server"

export async function POST(request: {json: () => PromiseLike<{title: String; date: String; content: String; image: String, blogID: Number}> | 
                                                             {title: String; date: String; content: String; image: String, blogID: Number}}) 
{
    try{
        connectionToDatabase()
        const {title, date, content, image, blogID} = await request.json()
        const newBlog = new Blog({title, date, content, image, blogID})
        await newBlog.save()
        return NextResponse.json({message: "blog post created", status: 201})
        
    } catch(err){
        return NextResponse.json({error: "error in server", status: 500})
    }
}

export async function GET(request: any){
    try{
        connectionToDatabase()
        const {blogID} = await request.json()
        const fetchBlog = await Blog.findOne({blogID: blogID})
        return NextResponse.json({message: "blog post created", status: 201, post: fetchBlog})
        
    } catch(err){
        return NextResponse.json({error: "error in server", status: 500})
    }
}