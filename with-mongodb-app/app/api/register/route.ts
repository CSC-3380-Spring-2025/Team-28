import connectionToDatabase from "@/lib/mongoose";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

//This will take the data submitted from the
export async function POST(request: {json: () => PromiseLike<{ name: any; email: any; password: any }> | { name: any; email: any; password: any }}) {
  try {
    //Connect to MongoDB
    connectionToDatabase();
    //Fetch the name, email, and password submitted through the create account page
    const { name, email, password } = await request.json();
    //Set some placeholder values to establish these fields in the new user document
    const hobbies: String[] = [];
    const pages: String[] = [];
    const sendEmail = false;
    const schedule = "";
    const reminder = "";
    //Make sure there is not an already existing user with the same email
    const userExist = await User.findOne({ email });
    if (userExist) {
      return NextResponse.json({ error: "user already exists" });
    } 
    //Otherwise, go ahead and create the new user in the database
    //The password is hashed for security reasons
    else {
      const hashPass = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: hashPass,
        hobbies,
        pages,
        sendEmail,
        schedule,
        reminder,
      });
      await newUser.save();
      return NextResponse.json({ message: "user registered", status: 201 });
    }
  } catch (err) {
    //Log error if something goes wrong in this process
    return NextResponse.json({ error: "error in server", status: 500 });
  }
}
