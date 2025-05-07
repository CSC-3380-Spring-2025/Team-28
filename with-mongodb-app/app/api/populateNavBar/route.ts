import connectionToDatabase from "@/lib/mongoose"
import User from "@/models/user"
import { NextResponse } from "next/server"

//This will create paths to populate the nav bar so the user can click on the links and go to the wanted tracker page
//If a user did not create a path, then a placeholder # will be used as a link (user remains on same page if clicked)
export async function GET() {
    try{
        //Set placeholder values, these arrays are used to send the correct path data to be used...
        //...to create links to these pages in the navbar
        var pages1 = ["#", "#", "#"]
        var pages2 = ["#", "#", "#"]
        var pages3 = ["#", "#", "#"]
        //Connect to MongoDB
        connectionToDatabase()
        //Find the data of the logged in user
        const userInfo = await User.findOne({email: process.env.NEXT_PUBLIC_LOGGED_IN_USER})
        //Create paths for the first hobby of the user if it exists
        if(userInfo.hobbies.length >= 1){
            //Creates path for a blog page for this hobby if path was created by user
            if(userInfo.pages.includes(userInfo.hobbies[0] + "/blog")){
                pages1[0] = "hobby/" + userInfo.hobbies[0] + "/blog"
            }
            //Creates path for a collections page for this hobby if path was created by user
            if(userInfo.pages.includes(userInfo.hobbies[0] + "/collections")){
                pages1[1] = "hobby/" + userInfo.hobbies[0] + "/collections"
            }
            //Creates path for a supplies page for this hobby if path was created by user
            if(userInfo.pages.includes(userInfo.hobbies[0] + "/supplies")){
                pages1[2] = "hobby/" + userInfo.hobbies[0] + "/supplies"
            }
        }
        //Create paths for the second hobby of the user if it exists
        if(userInfo.hobbies.length >= 2){
            //Creates path for a blog page for this hobby if path was created by user
            if(userInfo.pages.includes(userInfo.hobbies[1] + "/blog")){
                pages2[0] = "hobby/" + userInfo.hobbies[1] + "/blog"
            }
            //Creates path for a collections page for this hobby if path was created by user
            if(userInfo.pages.includes(userInfo.hobbies[1] + "/collections")){
                pages2[1] = "hobby/" + userInfo.hobbies[1] + "/collections"
            }
            //Creates path for a supplies page for this hobby if path was created by user
            if(userInfo.pages.includes(userInfo.hobbies[1] + "/supplies")){
                pages2[2] = "hobby/" + userInfo.hobbies[1] + "/supplies"
            }
        }
        //Create paths for the third hobby of the user if it exists
        if(userInfo.hobbies.length >= 3){
            //Creates path for a blog page for this hobby if path was created by user
            if(userInfo.pages.includes(userInfo.hobbies[2] + "/blog")){
                pages3[0] = "hobby/" + userInfo.hobbies[2] + "/blog"
            }
            //Creates path for a collections page for this hobby if path was created by user
            if(userInfo.pages.includes(userInfo.hobbies[2] + "/collections")){
                pages3[1] = "hobby/" + userInfo.hobbies[2] + "/collections"
            }
            //Creates path for a supplies page for this hobby if path was created by user
            if(userInfo.pages.includes(userInfo.hobbies[2] + "/supplies")){
                pages3[2] = "hobby/" + userInfo.hobbies[2] + "/supplies"
            }
        }
        //Return the newly created paths to be used in the navbar
        return NextResponse.json({message: "user logged in", status: 201, name: userInfo.name, hobbies: userInfo.hobbies, pages1: pages1, pages2: pages2, pages3: pages3, email: process.env.LOGGED_IN_USER})
    } catch(err){
        //Log error if something goes wrong in this process 
        return NextResponse.json({error: "error in server", status: 500})
    }
}