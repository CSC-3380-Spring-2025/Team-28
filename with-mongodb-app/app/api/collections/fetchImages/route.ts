import connectionToDatabase from "@/lib/mongoose"
import Collection from "@/models/collection"
import { NextResponse } from "next/server"

export async function POST(request: { json: () => PromiseLike<{ hobby: any }> | { hobby: any } }){
    try{
        await connectionToDatabase()
        const {hobby} = await request.json()
        const imageURL = []
        const title = []
        const _id = []
        const find = await Collection.find({email: process.env.NEXT_PUBLIC_LOGGED_IN_USER, hobby: hobby}, {imageURL:1, title:1, _id:1})
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
        return NextResponse.json({message: "images displayed", status: 201, imageURL: imageURL, title: title, _id: _id})
    } catch(err) {
        console.log(err)
        return NextResponse.json({message: "uh oh errorrr", status: 500})
    }
}

