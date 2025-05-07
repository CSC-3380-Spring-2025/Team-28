import connectionToDatabase from "@/lib/mongoose"
import Blog from "@/models/blog"
import { NextResponse } from "next/server"

export async function POST(request: { json: () => PromiseLike<{ id: any }> | { id: any } }){
    try{
        await connectionToDatabase()
        const {id} = await request.json()
        const find = await Blog.findById({_id: id}, {})
        const content = find.content
        const title = find.title
        const date = find.date.split(" ")
        const dateAdded = date[1] + " " + date[2] + ", " + date[3]
        return NextResponse.json({message: "Post fetched", status: 201, title: title, date: dateAdded, content: content, id: id})
    } catch(err) {
        console.log(err)
        return NextResponse.json({message: "Error", status: 500})
    }
}