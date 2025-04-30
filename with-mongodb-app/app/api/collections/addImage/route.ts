import connectionToDatabase from "@/lib/mongoose"
import Collection from "@/models/collection"
import { NextResponse } from "next/server"

export async function POST(request: { json: () => PromiseLike<{ title: any; imageURL: any; description: any; hobby: any }> | { title: any; imageURL: any; description: any; hobby: any } }){
    try{
        await connectionToDatabase()
        const {title, imageURL, description, hobby} = await request.json()
        const dateAdded = new Date()
        console.log(imageURL)
        const email = process.env.NEXT_PUBLIC_LOGGED_IN_USER
        const newImage = new Collection({
            imageURL, 
            dateAdded,
            title,
            description,
            email,
            hobby
        })
        await newImage.save()
        return NextResponse.json({message: "image added to collection", status: 201})
    } catch(err) {
        console.log(err)
        return NextResponse.json({message: "uh oh errorrr", status: 500})
    }
}