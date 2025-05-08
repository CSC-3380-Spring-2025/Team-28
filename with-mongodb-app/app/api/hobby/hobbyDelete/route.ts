import connectionToDatabase from "@/lib/mongoose"
import User from "@/models/user"
import { NextResponse } from "next/server"

//This will remove the requested hobby from the specified user's document
export async function POST(request: { json: () => PromiseLike<{ hobby: String}> | {hobby: String} }){
    try{
        //Connect to MongoDB
        await connectionToDatabase()
        //Fetch submitted hobby from hobby editor page
        const {hobby} = await request.json()
        //Find the correct user document
        const user = await User.findOne({email: process.env.LOGGED_IN_USER})
        //If user has no hobbies, return message saying nothing to delete
        if (user.hobbies.length <= 0){
            return NextResponse.json({message: "no hobbies to delete", status: 201})
        }
        //If hobby is not present in hobbies array, return message saying there is no hobby by that na,e
        else if(!user.hobbies.includes(hobby)){
            return NextResponse.json({message: "hobby does not exist", status: 201})
        }
        else{
            //Search the user's document for any partial paths that include the hobby to be deleted
            //Exclude those paths from the new subarray to be set as the new hobbies array
            for(var i = 0; i < user.pages.length; i++){
                if(user.pages[i].includes(hobby)){
                    user.pages.splice(hobby)
                }
            }
            //Remove the hobby from the user's document
            await User.findOneAndUpdate({email: process.env.LOGGED_IN_USER}, {$pull: { hobbies:  hobby }})
            //Set the user's document to contain paths that do not include the deleted hobby
            await User.findOneAndUpdate({email: process.env.LOGGED_IN_USER}, {$set: { pages:  user.pages }})
            //Return a message to show the operation was successful
            return NextResponse.json({message: "hobby deleted", status: 201})
        }
    } catch(err) {
        //Log error if something goes wrong in this process 
        return NextResponse.json({message: "uh oh errorrr", status: 500})
    }
}