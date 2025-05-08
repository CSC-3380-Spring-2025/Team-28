import connectionToDatabase from "@/lib/mongoose"
import Collection from "@/models/collection"
import { NextResponse } from "next/server"

//If a user presses the delete button on an individual item page...
//...this will fetch the image link of the individual item...
//...and use it to delete the requested item in the database
export async function POST(request: { json: () => PromiseLike<{url: any}> | {url: any} }){
    try{
        //Connect to MongoDB
        await connectionToDatabase()
        //Get the image url from the parameters of page
        const {url} = await request.json()
        //Take the image URL, search for the document with the corresponding image link, and delete it
        await Collection.deleteOne({imageURL: url})
        //Returns a response that denotes success in deleting the document from the collections collection
        return NextResponse.json({message: "image has been edited", status: 201})
    } catch(err) {
        //Log error if something goes wrong in this process 
        return NextResponse.json({message: "uh oh errorrr", status: 500})
    }
}