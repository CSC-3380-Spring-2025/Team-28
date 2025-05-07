import connectionToDatabase from "@/lib/mongoose"
import Collection from "@/models/collection"
import { NextResponse } from "next/server"

//This will take the data submitted from the add item to collection page...
//...and save it as a document in the collections collection
export async function POST(request: { json: () => PromiseLike<{ title: any; imageURL: any; description: any; hobby: any }> | { title: any; imageURL: any; description: any; hobby: any } }){
    try{
        //Connect to MongoDB
        await connectionToDatabase()
        //Fetch item title, image link, description from the submitted form
        //Hobby item should be associated with is passed through by fetching the first parameter after ../hobby/
        const {title, imageURL, description, hobby} = await request.json()
        //Get today's date
        const dateAdded = new Date()
        //Get the email of the user that is currently logged in
        const email = process.env.NEXT_PUBLIC_LOGGED_IN_USER
        //Creates new document based on collection schema
        const newImage = new Collection({
            imageURL, 
            dateAdded,
            title,
            description,
            email,
            hobby
        })
        //Saves the new document in the collections collection
        await newImage.save()
        //Returns a response that denotes success in adding a new document to the collections collection
        return NextResponse.json({message: "image added to collection", status: 201})
    } catch(err) {
        //Log error if something goes wrong in this process 
        return NextResponse.json({message: "uh oh errorrr", status: 500})
    }
}