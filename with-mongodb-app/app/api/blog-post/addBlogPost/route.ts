import connectionToDatabase from "@/lib/mongoose"
import Blog from "@/models/blog"
import { NextResponse } from "next/server"
//This will take the data submitted from the add post page...
//...and save it as a document in the blog
export async function POST(request: { json: () => PromiseLike<{ title: any; content: any; hobby: any }> | { title: any; content: any; hobby: any } }){
    try{
        //Connect to MongoDB
        await connectionToDatabase()
        //Fetch item title and content from the submitted form
        //Hobby item should be associated with is passed through by fetching the first parameter after ../hobby/
        const {title, content, hobby} = await request.json()
        //Get today's date
        const dateAdded = new Date()
        //Get the email of the user that is currently logged in
        const email = process.env.LOGGED_IN_USER
        //Creates new document based on collection schema
        const newBlogPost = new Blog({ 
            date: dateAdded,
            title,
            content,
            email,
            hobby
        })
        //Saves the new document in the blog
        await newBlogPost.save()
        //Returns a response that denotes success in adding a new document to the blog
        return NextResponse.json({message: "Post added to blog!", status: 201})
    } catch(err) {
        //Log error if something goes wrong in this process
        return NextResponse.json({message: "Error", status: 500})
    }
}