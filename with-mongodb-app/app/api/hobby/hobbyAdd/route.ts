import connectionToDatabase from "@/lib/mongoose"
import User from "@/models/user"
import { NextResponse } from "next/server"

//This will add the requested hobby to the specified user's document
export async function POST(request: { json: () => PromiseLike<{ hobby: String}> | {hobby: String} }){
    try{
        //Connect to MongoDB
        await connectionToDatabase()
        //Fetch submitted hobby from hobby editor page
        const {hobby} = await request.json()
        //Find the correct user document
        const user = await User.findOne({email: process.env.LOGGED_IN_USER})
        //If user already has the max amount of hobbies, prevent the user from adding anymore
        if (user.hobbies.length >= 3){
            return NextResponse.json({message: "max hobbies added", status: 201})
        }
        //If the user already added the hobby to their account, prevent them from adding the hobby again
        else if(user.hobbies.includes(hobby)){
            return NextResponse.json({message: "hobby already added", status: 201})
        }
        //Otherwise, allow the hobby to be added to the user's hobbies array...
        //...and return a message showing this operation was a success
        else{
            await User.findOneAndUpdate({email: process.env.LOGGED_IN_USER}, {$push: { hobbies: hobby }})
            return NextResponse.json({message: "hobby added", status: 201})
        }
    } catch(err) {
        //Log error if something goes wrong in this process 
        return NextResponse.json({message: "uh oh errorrr", status: 500})
    }
}