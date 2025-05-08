import connectionToDatabase from "@/lib/mongoose"
import User from "@/models/user"
import { NextResponse } from "next/server"

//This will delete the requested task from the task array in a user's document
export async function POST(request: { json: () => PromiseLike<{ task: any; email: any }> | { task: any; email: any } }){
    try{
        //Connect to MongoDB
        await connectionToDatabase()
        //Fetch the task to delete and the email of the logged in user
        const {task, email} = await request.json()
        //Find the document with the logged in user and remove the task to the tasks array in the document
        await User.findOneAndUpdate({email: email}, {$pull: {tasks: task}})
        //Return message that shows task removal was successful
        return NextResponse.json({message: "task deleted", status: 201})
    } catch(err) {
        //Log error if something goes wrong in this process 
        return NextResponse.json({message: "uh oh errorrr", status: 500})
    }
}