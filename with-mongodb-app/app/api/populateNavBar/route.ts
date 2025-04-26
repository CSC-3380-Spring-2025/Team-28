import connectionToDatabase from "@/lib/mongoose"
import User from "@/models/user"
import { NextResponse } from "next/server"

export async function GET() {
    try{
        var pages1 = ["#", "#", "#"]
        var pages2 = ["#", "#", "#"]
        var pages3 = ["#", "#", "#"]
        connectionToDatabase()
        const userInfo = await User.findOne({email: process.env.NEXT_PUBLIC_LOGGED_IN_USER})
        console.log(process.env.NEXT_PUBLIC_LOGGED_IN_USER)
        console.log(userInfo)

        if(userInfo.hobbies.length >= 1){
            if(userInfo.pages.includes(userInfo.hobbies[0] + "/blog")){
                pages1[0] = userInfo.hobbies[0] + "/blog"
            }
            if(userInfo.pages.includes(userInfo.hobbies[0] + "/collections")){
                pages1[1] = userInfo.hobbies[0] + "/collections"
            }
            if(userInfo.pages.includes(userInfo.hobbies[0] + "/supplies")){
                pages1[2] = userInfo.hobbies[0] + "/supplies"
            }
        }
        if(userInfo.hobbies.length >= 2){
            if(userInfo.pages.includes(userInfo.hobbies[1] + "/blog")){
                pages2[0] = userInfo.hobbies[1] + "/blog"
            }
            if(userInfo.pages.includes(userInfo.hobbies[1] + "/collections")){
                pages2[1] = userInfo.hobbies[1] + "/collections"
            }
            if(userInfo.pages.includes(userInfo.hobbies[1] + "/supplies")){
                pages2[2] = userInfo.hobbies[1] + "/supplies"
            }
        }
        if(userInfo.hobbies.length >= 3){
            if(userInfo.pages.includes(userInfo.hobbies[2] + "/blog")){
                pages3[0] = userInfo.hobbies[2] + "/blog"
            }
            if(userInfo.pages.includes(userInfo.hobbies[2] + "/collections")){
                pages3[1] = userInfo.hobbies[2] + "/collections"
            }
            if(userInfo.pages.includes(userInfo.hobbies[2] + "/supplies")){
                pages3[2] = userInfo.hobbies[2] + "/supplies"
            }
        }
        return NextResponse.json({message: "user logged in", status: 201, name: userInfo.name, hobbies: userInfo.hobbies, pages1: pages1, pages2: pages2, pages3: pages3, email: process.env.LOGGED_IN_USER})
    } catch(err){
        return NextResponse.json({error: "error in server", status: 500})
    }
}