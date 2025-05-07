import connectionToDatabase from "@/lib/mongoose"
import Blog from "@/models/blog"
import { NextResponse } from "next/server"
//If a user submits data in the edit item form...
//...this request will search for the proper document in the blog...
//...and update the document with the new information
export async function POST(request: { json: () => PromiseLike<{ title: any; id: any; content: any }> | { title: any; id: any; content: any } }){
    try{
        //Connect to MongoDB
        await connectionToDatabase()
        //Fetch item title and content from the submitted form
        //Get the id from the parameters of the page
        const {title, id, content} = await request.json()
        //Don't edit anything if there is no data submitted
        if((title === "") && (content === "")){
            await Blog.findByIdAndUpdate({_id: id}, {title: title, content: content})
            return NextResponse.json({message: "Nothing to edit", status: 201})
        }
        //Only edit the content if that is the only input filled
        else if(title === ""){
            await Blog.findByIdAndUpdate({_id: id}, {content: content})
            return NextResponse.json({message: "content has been edited", status: 201})
        }
        //Only edit the title if that is the only input filled
        else if(content === ""){
            await Blog.findByIdAndUpdate({_id: id}, {title: title})
            return NextResponse.json({message: "Title has been edited", status: 201})
        }
        //Edit both title and content if both fields are filled
        else{
            await Blog.findByIdAndUpdate({_id: id}, {title: title, content: content})
            return NextResponse.json({message: "Title & content have been edited", status: 201})
        }
    } catch(err) {
        //Log error if something goes wrong in this process
        return NextResponse.json({message: "Error", status: 500})
    }
}