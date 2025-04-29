import connectionToDatabase from "@/lib/mongoose"
import Collection from "@/models/collection"
import { NextResponse } from "next/server"

export async function GET(){
    try{
        await connectionToDatabase()
        //include id somewhere
        const find = await Collection.findOne({email: process.env.LOGGED_IN_EMAIL}, {imageURL:1, title:1, _id:1})
        const imageURL = find.imageURL
        const title = find.title
        const _id = find._id
        console.log(find)
        console.log(imageURL)
        console.log(title)
        console.log(_id)
        return NextResponse.json({message: "image added to collection", status: 201, imageURL: imageURL, title: title, _id: _id})
    } catch(err) {
        console.log(err)
        return NextResponse.json({message: "uh oh errorrr", status: 500})
    }
}