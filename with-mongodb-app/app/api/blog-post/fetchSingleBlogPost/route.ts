import connectionToDatabase from "@/lib/mongoose"
import Blog from "@/models/blog"
import { NextResponse } from "next/server"
//This will fetch the data of a single document in the blog to display on an individual item page 
export async function POST(request: { json: () => PromiseLike<{ id: any }> | { id: any } }){
    try{
        //Connect to MongoDB
        await connectionToDatabase()
        //Get the id from the parameters of page
        const {id} = await request.json()
        //Use the id to find the document that contains all the information of that one item
        const find = await Blog.findById({_id: id}, {})
        //Set the data retrieved to the corresponding constants 
        const content = find.content
        const title = find.title
        //For the date, each part of the date is split into elements of an array
        const date = find.date.split(" ")
        //The elements are then formatted to display in a month day year format
        const dateAdded = date[1] + " " + date[2] + ", " + date[3]
        //Return the fetched data to be displayed on the individual item page
        return NextResponse.json({message: "Post fetched", status: 201, title: title, date: dateAdded, content: content, id: id})
    } catch(err) {
        //Log error if something goes wrong in this process 
        return NextResponse.json({message: "Error", status: 500})
    }
}