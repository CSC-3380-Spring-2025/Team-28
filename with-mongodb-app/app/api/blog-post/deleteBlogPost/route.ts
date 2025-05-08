import connectionToDatabase from "@/lib/mongoose"
import Blog from "@/models/blog"
import { NextResponse } from "next/server"
//If a user presses the delete button on an individual item page...
//...this will fetch the id of the individual item...
//...and use it to delete the requested item in the database
export async function POST(request: { json: () => PromiseLike<{ id: any }> | { id: any } }){
    try{
        //Connect to MongoDB
        await connectionToDatabase()
        //Get the post id from the parameters of page
        const {id} = await request.json()
        //Take the id, search for the document with the corresponding id, and delete it
        await Blog.findByIdAndDelete({_id: id})
        //Returns a response that denotes success in deleting the document from the blog
        return NextResponse.json({message: "Post deleted!", status: 201})
    } catch(err) {
        //Log error if something goes wrong in this process
        return NextResponse.json({message: "uh oh errorrr", status: 500})
    }
}