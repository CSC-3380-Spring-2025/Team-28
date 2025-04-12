import connectionToDatabase from "@/lib/mongoose"
import Hobby from "@/models/hobby"
import { NextResponse } from "next/server"

export async function POST(request: { json: () => PromiseLike<{ hobby: String; tracker: String }> | { hobby: String; tracker: String } }){
    try{
        await connectionToDatabase()
        const {hobby, tracker} = await request.json()
        const pathExistance = await Hobby.findOne({hobby,tracker})
        if(!pathExistance){
            console.log("path does not exist")
            return NextResponse.json({error: "path does not exist", status: 404})
        }

        console.log("path does not exist")
        return NextResponse.json({message: "path exists", status: 201})
    } catch(err) {
        console.log(err)
    }
}