import connectionToDatabase from "@/lib/mongoose"
import Collection from "@/models/collection"
import { NextResponse } from "next/server"

export async function POST(request: { json: () => PromiseLike<{url: any}> | {url: any} }){
    try{
        await connectionToDatabase()
        const {url} = await request.json()
        await Collection.deleteOne({imageURL: url})
        return NextResponse.json({message: "image has been edited", status: 201})
    } catch(err) {
        console.log(err)
        return NextResponse.json({message: "uh oh errorrr", status: 500})
    }
}