import connectionToDatabase from "@/lib/mongoose"
import Collection from "@/models/collection"
import { NextResponse } from "next/server"

export async function POST(request: { json: () => PromiseLike<{id: any; title: any; imageURL: any; description: any }> | { id: any; title: any; imageURL: any; description: any } }){
    try{
        await connectionToDatabase()
        //find some way to fetch _id field
        const {id, title, imageURL, description} = await request.json()
        console.log(imageURL)
        await Collection.findOneAndUpdate({_id: id}, {title: title, imageUrl: imageURL, description: description})
        return NextResponse.json({message: "image has been edited", status: 201})
    } catch(err) {
        console.log(err)
        return NextResponse.json({message: "uh oh errorrr", status: 500})
    }
}