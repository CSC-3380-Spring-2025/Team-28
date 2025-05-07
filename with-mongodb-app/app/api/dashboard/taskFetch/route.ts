import connectionToDatabase from "@/lib/mongoose"
import User from "@/models/user"
import { NextResponse } from "next/server"

export async function GET(){
    try{
        await connectionToDatabase()
        const tasks = await User.findOne({email: process.env.NEXT_PUBLIC_LOGGED_IN_USER}, {tasks: 1})
        console.log(tasks)
        return NextResponse.json({error: "random images picked for user", status: 201, tasks: tasks.tasks})
    } catch(err) {
        console.log(err)
    }
}