import connectionToDatabase from "@/lib/mongoose"
import User from "@/models/user"
import { NextResponse } from "next/server"

//This will fetch the hobbies associated with the user and return them
export async function GET(){
    try{
        //Connect to MongoDB
        await connectionToDatabase()
        //Find the correct user document and get the corresponding hobbies array
        const hobbies = await User.findOne({email: process.env.LOGGED_IN_USER}, {hobbies: 1})
        //Return the hobbies associated with the user
        return NextResponse.json({message: "hobby added", status: 201, hobbies: hobbies})
    } catch(err) {
        //Log error if something goes wrong in this process 
        return NextResponse.json({message: "uh oh errorrr", status: 500})
    }
}