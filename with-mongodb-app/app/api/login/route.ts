import connectionToDatabase from "@/lib/mongoose"
import User from "@/models/user"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"

//This takes the data submitted from the login page, verfies the email and password combination...
//...then allows or denies access to the dashboard accordingly
export async function POST(request: { json: () => PromiseLike<{ name: any; email: any; password: any }> | { name: any; email: any; password: any } }) {
    try{
        //Connect to MongoDB
        connectionToDatabase()
        //Fetches email and password user submitted
        const {email, password} = await request.json()
        //Makes sure user exists in the database
        const userExist = await User.findOne({email})
        if(!userExist){
            return NextResponse.json({error: "user does not exist"})
        }
        //Compares the password submitted and the password in the database
        //If they don't match, deny entry
        //Otherwise, set the user email as the currently logged in user...
        //...and let them in
        const checkPass = await bcrypt.compare(password, userExist.password)
        if(!checkPass){
            return NextResponse.json({message: "wrong pass", status: 404})
        }
        else{
            process.env.LOGGED_IN_USER = email
            return NextResponse.json({message: "user logged in", status: 201})
        }
    } catch(err){
        //Log error if something goes wrong in this process 
        return NextResponse.json({error: "error in server", status: 500})
    }
}