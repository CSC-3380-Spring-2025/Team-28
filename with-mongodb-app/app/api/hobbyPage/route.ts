import connectionToDatabase from "@/lib/mongoose"
import Hobby from "@/models/hobby"
import User from "@/models/user"
import { NextResponse } from "next/server"

export async function POST(request: { json: () => PromiseLike<{ hobby: string; tracker: String }> | { hobby: String; tracker: String } }){
    try{
        await connectionToDatabase()
        const {hobby, tracker} = await request.json()
        const user = await User.findOne({email: process.env.LOGGED_IN_USER})
        console.log(user.hobbies)
        if(user.pages.includes(hobby +"/"+ tracker)){
            return NextResponse.json({message: "path exists", status: 201, hobby: hobby, tracker: tracker})
        }
        else{
            console.log("tracker page does not exist")
            return NextResponse.json({error: "path does not exist", status: 404})
        }
        /*const pathExistance = await Hobby.findOne({hobby,tracker})
        if(!pathExistance){
            console.log("path does not exist")
            return NextResponse.json({error: "path does not exist", status: 404})
        }*/

        //console.log("path does exist")
        //return NextResponse.json({message: "path exists", status: 201})
    } catch(err) {
        console.log(err)
    }
}