import connectionToDatabase from "@/lib/mongoose"
import Collection from "@/models/collection"
import { NextResponse } from "next/server"

//This will fetch all the images and titles of the items to display on the Collections tracker
export async function POST(request: { json: () => PromiseLike<{ hobby: any }> | { hobby: any } }){
    try{
        //Connect to MongoDB
        await connectionToDatabase()
        //Fetch the first parameter after ../hobby/
        const {hobby} = await request.json()
        //Create arrays to hold the image URLs and titles
        let imageURL = []
        let title = []
        //Retrieve all the images and titles for the corresponding user and hobby
        const find = await Collection.find({email: process.env.LOGGED_IN_USER, hobby: hobby}, {imageURL:1, title:1})
        //Add all image URLs and titles to their respective arrays
        for(var i = 0; i < find.length; i++){
            imageURL.push(find[i].imageURL)
        }
        for(var i = 0; i < find.length; i++){
            title.push(find[i].title)
        }
        //Return the image URL and title arrays to be used 
        return NextResponse.json({message: "images displayed", status: 201, imageURL: imageURL, title: title})
    } catch(err) {
        //Log error if something goes wrong in this process 
        return NextResponse.json({message: "uh oh errorrr", status: 500})
    }
}

