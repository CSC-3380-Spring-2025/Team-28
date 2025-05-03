import connectionToDatabase from "@/lib/mongoose"
import Blog from "@/models/blog"
import { NextResponse } from "next/server"

export async function POST(request: { json: () => PromiseLike<{ title: any; content: any; hobby: any }> | { title: any; content: any; hobby: any } }){
    try{
        await connectionToDatabase()
        const {title, content, hobby} = await request.json()
        const dateAdded = new Date()
        const email = process.env.NEXT_PUBLIC_LOGGED_IN_USER
        console.log(title)
        console.log(content)
        console.log(dateAdded)
        const newBlogPost = new Blog({ 
            date: dateAdded,
            title,
            content,
            email,
            hobby
        })
        await newBlogPost.save()
        return NextResponse.json({message: "Post added to blog!", status: 201})
    } catch(err) {
        console.log(err)
        return NextResponse.json({message: "Error", status: 500})
    }
}