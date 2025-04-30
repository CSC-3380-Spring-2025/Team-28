import connectionToDatabase from "@/lib/mongoose"
import Collection from "@/models/collection"
import { NextResponse } from "next/server"

export async function POST(request: { json: () => PromiseLike<{title: any; imageURL: any; description: any }> | {title: any; imageURL: any; description: any } }){
    try{
        await connectionToDatabase()
        const {title, imageURL, description} = await request.json()
        console.log("editing image in collection")
        console.log(title)
        console.log(imageURL)
        console.log(description)
        if((title === "") && (description === "")){
            await Collection.findOneAndUpdate({imageURL: imageURL}, {title: title, description: description})
            return NextResponse.json({message: "nothing to edit", status: 201})
        }
        else if(title === ""){
            await Collection.findOneAndUpdate({imageURL: imageURL}, {description: description})
            return NextResponse.json({message: "image has been edited", status: 201})
        }
        else if(description === ""){
            await Collection.findOneAndUpdate({imageURL: imageURL}, {title: title})
            return NextResponse.json({message: "image has been edited", status: 201})
        }
        else{
            await Collection.findOneAndUpdate({imageURL: imageURL}, {title: title, description: description})
            return NextResponse.json({message: "image has been edited", status: 201})
        }
    } catch(err) {
        console.log(err)
        return NextResponse.json({message: "uh oh errorrr", status: 500})
    }
}