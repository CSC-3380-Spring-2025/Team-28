import connectionToDatabase from "@/lib/mongoose"
import Hobby from "@/models/hobby"
import User from "@/models/user"
import { NextResponse } from "next/server"

//This allows a user to remove a page for their hobbies
//It takes the data submitted on the hobby editor page...
//...and removes the specified partial path in the user's document
export async function POST(request: { json: () => PromiseLike<{ hobby: String; tracker: String}> | {hobby: String; tracker: String} }){
    try{
        //Connect to MongoDB
        await connectionToDatabase()
        //Fetch submitted hobby and tracker type from hobby editor page
        const {hobby, tracker} = await request.json()
        //Find the correct user document with the corresponding path to be deleted
        //If found, delete it from the document
        if (await User.find({email: process.env.LOGGED_IN_USER}, { pages: (hobby + "/" + tracker) } )){
            User.findOneAndUpdate({email: process.env.LOGGED_IN_USER}, { $pull: {pages: (hobby + "/" + tracker)} })
        }
        //Otherwise, return a message showing the path does not exist
        else{
            return NextResponse.json({message: "path does not already exist !!", status: 201})
        }
    } catch(err) {
        //Log error if something goes wrong in this process 
        return NextResponse.json({message: "uh oh errorrr", status: 500})
    }
}