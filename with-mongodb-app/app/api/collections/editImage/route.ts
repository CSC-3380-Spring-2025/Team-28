import connectionToDatabase from "@/lib/mongoose"
import Collection from "@/models/collection"
import { NextResponse } from "next/server"

//If a user submits data in the edit item form...
//...this request will search for the proper document in the collections collection...
//...and update the document with the new information
export async function POST(request: { json: () => PromiseLike<{title: any; imageURL: any; description: any }> | {title: any; imageURL: any; description: any } }){
    try{
        //Connect to MongoDB
        await connectionToDatabase()
        //Fetch item title and description from the submitted form
        //Get the image link from the parameters of the page
        const {title, imageURL, description} = await request.json()
        //Don't edit anything if there is no data submitted
        if((title === "") && (description === "")){
            return NextResponse.json({message: "nothing to edit", status: 201})
        }
        //Only edit the description if that is the only input filled
        else if(title === ""){
            await Collection.findOneAndUpdate({imageURL: imageURL}, {description: description})
            return NextResponse.json({message: "description has been edited", status: 201})
        }
        //Only edit the title if that is the only input filled
        else if(description === ""){
            await Collection.findOneAndUpdate({imageURL: imageURL}, {title: title})
            return NextResponse.json({message: "title has been edited", status: 201})
        }
        //Edit both title and description if both fields are filled
        else{
            await Collection.findOneAndUpdate({imageURL: imageURL}, {title: title, description: description})
            return NextResponse.json({message: "title & description have been edited", status: 201})
        }
    } catch(err) {
        //Log error if something goes wrong in this process 
        return NextResponse.json({message: "uh oh errorrr", status: 500})
    }
}