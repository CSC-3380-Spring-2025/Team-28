import connectionToDatabase from "@/lib/mongoose"
import User from "@/models/user"
import { NextResponse } from "next/server"

//This allows a user to create new pages for their hobbies
//It takes the data submitted on the hobby editor page...
//...and stores it as a partial path in the user's document
export async function POST(request: { json: () => PromiseLike<{ hobby: String; tracker: String}> | {hobby: String; tracker: String} }){
    try{
        //Connect to MongoDB
        await connectionToDatabase()
        //Fetch submitted hobby and tracker type from hobby editor page
        const {hobby, tracker} = await request.json()
        //Find the correct user document
        const user = await User.findOne({email: process.env.LOGGED_IN_USER})
        //If the user already created the path, return a message saying the path exists already
        if (user.pages.includes((hobby + "/" + tracker))){
            return NextResponse.json({message: "path already exists !!", status: 201})
        }
        //Otherwise, add the partial path to the user's document...
        //...and return a message saying this was done
        else{
            await User.findOneAndUpdate({email: process.env.LOGGED_IN_USER}, { $push: {pages: (hobby + "/" + tracker)} })
            return NextResponse.json({message: "path added", status: 201})
        }
    } catch(err) {
        //Log error if something goes wrong in this process 
        return NextResponse.json({message: "uh oh errorrr", status: 500})
    }
}