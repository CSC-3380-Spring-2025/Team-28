import connectionToDatabase from "@/lib/mongoose"
import Collection from "@/models/collection"
import { NextResponse } from "next/server"

export async function POST(request: { json: () => PromiseLike<{id: any}> | {id: any} }){
    try{
        await connectionToDatabase()
        //find some way to fetch _id field
        const {id} = await request.json()
        await Collection.deleteOne({_id: id})
        return NextResponse.json({message: "image has been edited", status: 201})
    } catch(err) {
        console.log(err)
        return NextResponse.json({message: "uh oh errorrr", status: 500})
    }
}