import connectionToDatabase from "@/lib/mongoose"
import Collection from "@/models/collection"
import { NextResponse } from "next/server"

export async function GET(){
    try{
        await connectionToDatabase()
        const imageURL = []
        const title = []
        const _id = []
        const find = await Collection.find({email: process.env.LOGGED_IN_USER}, {imageURL:1, title:1, _id:1})
        for(var i = 0; i < find.length; i++){
            imageURL.push(find[i].imageURL)
        }
        for(var i = 0; i < find.length; i++){
            title.push(find[i].title)
        }
        for(var i = 0; i < find.length; i++){
            _id.push(find[i]._id)
        }
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

