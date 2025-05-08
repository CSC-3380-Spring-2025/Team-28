import connectionToDatabase from "@/lib/mongoose"
import Collection from "@/models/collection"
import { NextResponse } from "next/server"

//This will fetch the data of a single document in the collections collection to display on an individual item page 
export async function POST(request: { json: () => PromiseLike<{ url: any }> | { url: any } }){
    try{
        //Connect to MongoDB
        await connectionToDatabase()
        //Get the image url from the parameters of page
        const {url} = await request.json()
        //Use the image url to find the document that contains all the information of that one item
        const find = await Collection.findOne({imageURL: url}, {})
        //Set the data retrieved to the corresponding constants 
        const imageURL = find.imageURL
        const title = find.title
        //For the date, each part of the date is split into elements of an array
        const date = find.dateAdded.split(" ")
        //The elements are then formatted to display in a month day year format
        const dateAdded = date[1] + " " + date[2] + ", " + date[3]
        const desc = find.description
        //Return the fetched data to be displayed on the individual item page
        return NextResponse.json({message: "image fetched", status: 201, title: title, date: dateAdded, imageURL: imageURL, description: desc})
    } catch(err) {
        //Log error if something goes wrong in this process 
        return NextResponse.json({message: "uh oh errorrr", status: 500})
    }
}