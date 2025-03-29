import connectionToDatabase from "@/lib/mongoose"
import Hobby from "@/models/hobby"
import { NextResponse } from "next/server"

export async function POST(request: { json: () => PromiseLike<{ hobby: String; tracker: String }> | { hobby: String; tracker: String } }){
    try{
        await connectionToDatabase()
        const {hobby, tracker} = await request.json()
        const newHobby = new Hobby({hobby, tracker})
        await newHobby.save()
        return NextResponse.json(newHobby, {status: 201})
    } catch(err) {
        console.log(err)
    }
}

