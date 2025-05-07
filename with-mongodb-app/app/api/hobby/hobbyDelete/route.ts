import connectionToDatabase from "@/lib/mongoose"
import User from "@/models/user"
import { NextResponse } from "next/server"

export async function POST(request: { json: () => PromiseLike<{ hobby: String}> | {hobby: String} }){
    try{
        await connectionToDatabase()
        const {hobby} = await request.json()
        const x = await User.findOne({email: process.env.LOGGED_IN_USER})
        if (x.hobbies.length <= 0){
            return NextResponse.json({message: "no hobbies to delete", status: 201})
        }
        else if(!x.hobbies.includes(hobby)){
            return NextResponse.json({message: "hobby does not exist", status: 201})
        }
        else{
            for(var i = 0; i < x.pages.length; i++){
                if(x.pages[i].includes(hobby)){
                    x.pages.splice(hobby)
                    console.log(x.pages)
                }
            }
            await User.findOneAndUpdate({email: process.env.LOGGED_IN_USER}, {$pull: { hobbies:  hobby }})
            await User.findOneAndUpdate({email: process.env.LOGGED_IN_USER}, {$set: { pages:  x.pages }})
            return NextResponse.json({message: "hobby deleted", status: 201})
        }
    } catch(err) {
        console.log(err)
        return NextResponse.json({message: "uh oh errorrr", status: 500})
    }
}