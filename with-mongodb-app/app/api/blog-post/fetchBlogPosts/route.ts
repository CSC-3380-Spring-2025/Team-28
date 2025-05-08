import connectionToDatabase from "@/lib/mongoose"
import Blog from "@/models/blog"
import { NextResponse } from "next/server"
//This will fetch all the images and titles of the items to display on the Collections tracker
export async function POST(request: { json: () => PromiseLike<{ hobby: any }> | { hobby: any } }){
    try{
        //Connect to MongoDB
        await connectionToDatabase()
        //Fetch the first parameter after ../hobby/
        const {hobby} = await request.json()
        //Create arrays to hold the contents, ids, and titles
        let content = []
        let title = []
        let _id = []
        //Retrieve all the images and titles for the corresponding user and hobby
        const find = await Blog.find({email: process.env.LOGGED_IN_USER, hobby: hobby}, {content:1, title:1, _id:1})
        //Add all contents, ids, and titles to their respective arrays
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
        //Return the content, id, and title arrays to be used
        return NextResponse.json({message: "Posts displayed", status: 201, content: content, title: title, _id: _id})
    } catch(err) {
        //Log error if something goes wrong in this process 
        return NextResponse.json({message: "Error", status: 500})
    }
}

