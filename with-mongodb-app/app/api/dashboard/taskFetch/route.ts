import connectionToDatabase from "@/lib/mongoose"
import User from "@/models/user"
import { NextResponse } from "next/server"

//This fetches all the tasks already in the task array of the specified document
export async function GET(){
    try{
        //Connect to MongoDB
        await connectionToDatabase()
        //Find the document with the logged in user and return the tasks present
        const tasks = await User.findOne({email: process.env.LOGGED_IN_USER}, {tasks: 1})
        //Return the tasks to be used on the dashboard page
        return NextResponse.json({error: "random images picked for user", status: 201, tasks: tasks.tasks})
    } catch(err) {
        //Log error if something goes wrong in this process 
        return NextResponse.json({message: "uh oh errorrr", status: 500})
    }
}