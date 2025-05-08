import connectionToDatabase from "@/lib/mongoose";
import User from "@/models/user";
import { NextResponse } from "next/server";

//This will fetch the data submitted in the email reminder form and save this in the logged in user's document
export async function POST(request: { json: () => PromiseLike<{ recieveEmails: any; day: any; hour: any; min: any; message: any; }> | { recieveEmails: any; day: any; hour: any; min: any; message: any; }; }) {
  //Fetch the email of the logged in user 
  const email = process.env.LOGGED_IN_USER!;
  try {
    //Connect to MongoDB
    connectionToDatabase();
    //Fetch the data submitted in the email reminder form
    const { recieveEmails, day, hour, min, message } = await request.json();
    //Make sure the user exists
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return NextResponse.json({ error: "user does not exist" });
    }
    //Put schedule info into cron format
    const scheduleDate = min+" "+hour+" * * "+day
    //Update user document with submitted information
    await User.findOneAndUpdate({email: email}, {$set: {sendEmail: recieveEmails, schedule: scheduleDate, reminder: message}}, { new: true })
    //Return message the indicates this action was successful
    return NextResponse.json({ message: "email schedule updated", status: 201 });
  } catch (err) {
    //Log error if something goes wrong in this process 
    return NextResponse.json({ error: "error in server", status: 500 });
  }
}
