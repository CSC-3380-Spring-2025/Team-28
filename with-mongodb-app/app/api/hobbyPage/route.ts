import connectionToDatabase from "@/lib/mongoose"
import User from "@/models/user"
import { NextResponse } from "next/server"

//This checks whether or not a path to a hobby tracker exists in a user's document
export async function POST(request: { json: () => PromiseLike<{ hobby: string; tracker: String }> | { hobby: String; tracker: String } }){
    try{
        //Connect to MongoDB
        await connectionToDatabase()
        //Fetch the hobby and tracker from the parameters in the url
        const {hobby, tracker} = await request.json()
        //Find the document of the logged in user in the user collection
        const user = await User.findOne({email: process.env.LOGGED_IN_USER})
        //If the path exists in the user's pages array, give back the hobby and tracker
        if(user.pages.includes(hobby +"/"+ tracker)){
            return NextResponse.json({message: "path exists", status: 201, hobby: hobby, tracker: tracker})
        }
        //Otherwise, indicate the path is nonexistant
        else{
            return NextResponse.json({error: "path does not exist", status: 404})
        }
    } catch(err) {
        //Log error if something goes wrong in this process 
        return NextResponse.json({message: "uh oh errorrr", status: 500})
    }
}