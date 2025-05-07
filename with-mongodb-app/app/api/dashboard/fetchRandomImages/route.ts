import connectionToDatabase from "@/lib/mongoose"
import Collection from "@/models/collection"
import { NextResponse } from "next/server"

//This will fetch 3 random images to display on the main dashboard 
export async function GET(){
    try{
        //Connect to MongoDB
        await connectionToDatabase()
        //Find the email to 
        const colExist = await Collection.findOne({email: process.env.NEXT_PUBLIC_LOGGED_IN_USER})
        //Establish a variable to store fetched images
        let fetchRandCol
        //Make sure the user exists, then get three random images from collections that are associated with the logged in user
        if(colExist){
            fetchRandCol = await Collection.aggregate([{ $match: { email: process.env.NEXT_PUBLIC_LOGGED_IN_USER } },
                { $sample: { size: 3 } }])
        }
        //Return the random image data to be used on the dashboard page
        return NextResponse.json({error: "random images picked for user", status: 201, images: fetchRandCol})
    } catch(err) {
        //Log error if something goes wrong in this process 
        return NextResponse.json({message: "uh oh errorrr", status: 500})
    }
}