import connectionToDatabase from "@/lib/mongoose"
import Collection from "@/models/collection"
import { NextResponse } from "next/server"

//This will fetch 3 random images to display on the main dashboard 
export async function POST(request: { json: () => PromiseLike<{ email: any }> | { email: any } }){
    try{
        //Connect to MongoDB
        await connectionToDatabase()
        //Get the user email
        const { email } = await request.json()
        console.log(email)
        //Get three random images from collections that are associated with the logged in user
        const fetchRandCol = await Collection.aggregate([{ $match: { email: email } },
                { $sample: { size: 3 } }])

        //Return the random image data to be used on the dashboard page
        return NextResponse.json({error: "random images picked for user", status: 201, images: fetchRandCol})
    } catch(err) {
        //Log error if something goes wrong in this process 
        return NextResponse.json({message: "uh oh errorrr", status: 500})
    }
}