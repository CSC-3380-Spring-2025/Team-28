import connectionToDatabase from "@/lib/mongoose"
import Blog from "@/models/blog"
import { NextResponse } from "next/server"

export async function POST(request: { json: () => PromiseLike<{ title: any; id: any; content: any }> | { title: any; id: any; content: any } }){
    try{
        //Connect to MongoDB
        await connectionToDatabase()
        const {title, id, content} = await request.json()
        console.log(id)
        if((title === "") && (content === "")){
            await Blog.findByIdAndUpdate({_id: id}, {title: title, content: content})
            return NextResponse.json({message: "Nothing to edit", status: 201})
        }
        else if(title === ""){
            await Blog.findByIdAndUpdate({_id: id}, {content: content})
            return NextResponse.json({message: "content has been edited", status: 201})
        }
        else if(content === ""){
            await Blog.findByIdAndUpdate({_id: id}, {title: title})
            return NextResponse.json({message: "Title has been edited", status: 201})
        }
        else{
            await Blog.findByIdAndUpdate({_id: id}, {title: title, content: content})
            return NextResponse.json({message: "Title & content have been edited", status: 201})
        }
    } catch(err) {
        console.log(err)
        return NextResponse.json({message: "Error", status: 500})
    }
}