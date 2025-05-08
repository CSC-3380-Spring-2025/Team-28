import connectionToDatabase from "@/lib/mongoose";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

//This takes the data inputted into the forgot password page and updates a user's document with the new password
export async function POST(request: {json: () => PromiseLike<{ email: any; password: any }> | { email: any; password: any }}) {
  try {
    //Connect to MongoDB
    connectionToDatabase();
    //Get the email and new password of the user from the submitted form
    const { email, password } = await request.json();
    //Encrypt the password for safe keeping
    const hashPass = await bcrypt.hash(password, 10);
    //This constant is used to search for the specified user
    const filter = { email: email };
    //This is the data that will be updated in the found user's document
    const update = { password: hashPass };
    //Make sure user exists, then update the password of the user
    const userExist = await User.findOne(filter);
    if (!userExist) {
        return NextResponse.json({ error: "user does not exist" });
    }
    else{
        await User.updateOne(filter, update);
        return NextResponse.json({ message: "password changed", status: 201 });
    }
  } catch (err) {
    //Log error if something goes wrong in this process 
    return NextResponse.json({ error: "error in server", status: 500 });
  }
}