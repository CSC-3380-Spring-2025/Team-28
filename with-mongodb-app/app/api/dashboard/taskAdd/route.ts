import connectionToDatabase from "@/lib/mongoose"
import User from "@/models/user"
import { NextResponse } from "next/server"

//This will store the requested task to the task array in a user's document
export async function POST(request: { json: () => PromiseLike<{ task: any; email: any }> | { task: any; email: any } }){
    try{
        //Connect to MongoDB
        await connectionToDatabase()
        //Fetch the task inputted and the email of the logged in user
        const {task, email} = await request.json()
        //Find the document with the logged in user and add the task to the tasks array in the document
        await User.findOneAndUpdate({email: email}, {$push: {tasks: task}})
        //Return message that shows task adding was successful
        return NextResponse.json({message: "task added", status: 201})
    } catch(err) {
        //Log error if something goes wrong in this process 
        return NextResponse.json({message: "uh oh errorrr", status: 500})
    }
}