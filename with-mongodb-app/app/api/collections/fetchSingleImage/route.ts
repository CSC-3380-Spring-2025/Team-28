import connectionToDatabase from "@/lib/mongoose"
import Collection from "@/models/collection"
import { NextResponse } from "next/server"

export async function POST(request: { json: () => PromiseLike<{ url: any }> | { url: any } }){
    try{
        await connectionToDatabase()
        const {url} = await request.json()
        const find = await Collection.findOne({imageURL: url}, {})
        //console.log(find)
        const imageURL = find.imageURL
        const title = find.title
        const date = find.dateAdded.split(" ")
        const dateAdded = date[1] + " " + date[2] + ", " + date[3]
        const desc = find.description
        //console.log(imageURL)
        //console.log(title)
        return NextResponse.json({message: "image fetched", status: 201, title: title, date: dateAdded, imageURL: imageURL, description: desc})
    } catch(err) {
        console.log(err)
        return NextResponse.json({message: "uh oh errorrr", status: 500})
    }
}