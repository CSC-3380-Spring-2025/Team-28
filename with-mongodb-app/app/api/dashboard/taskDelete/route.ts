import connectionToDatabase from "@/lib/mongoose"
import User from "@/models/user"
import { NextResponse } from "next/server"

export async function POST(request: { json: () => PromiseLike<{ task: any; email: any }> | { task: any; email: any } }){
    try{
        await connectionToDatabase()
        const {task, email} = await request.json()
        console.log(task)
        await User.findOneAndUpdate({email: email}, {$pull: {tasks: task}})
        return NextResponse.json({message: "task deleted", status: 201})

    } catch(err) {
        console.log(err)
        return NextResponse.json({message: "uh oh errorrr", status: 500})
    }
}