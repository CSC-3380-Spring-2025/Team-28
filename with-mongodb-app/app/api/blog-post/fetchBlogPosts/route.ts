import connectionToDatabase from "@/lib/mongoose"
import Blog from "@/models/blog"
import { NextResponse } from "next/server"

export async function POST(request: { json: () => PromiseLike<{ hobby: any }> | { hobby: any } }){
    try{
        //Connect to MongoDB
        await connectionToDatabase()
        const {hobby} = await request.json()
        const content = []
        const title = []
        const _id = []
        const find = await Blog.find({email: process.env.NEXT_PUBLIC_LOGGED_IN_USER, hobby: hobby}, {content:1, title:1, _id:1})
        for(var i = 0; i < find.length; i++){
            content.push(find[i].content)
        }
        for(var i = 0; i < find.length; i++){
            title.push(find[i].title)
        }
        for(var i = 0; i < find.length; i++){
            _id.push(find[i]._id)
            console.log(_id.toString())
        }
        return NextResponse.json({message: "Posts displayed", status: 201, content: content, title: title, _id: _id})
    } catch(err) {
        console.log(err)
        return NextResponse.json({message: "Error", status: 500})
    }
}

