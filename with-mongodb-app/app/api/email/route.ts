import connectionToDatabase from "@/lib/mongoose";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request: { json: () => PromiseLike<{ recieveEmails: any; day: any; hour: any; min: any; message: any; }> | { recieveEmails: any; day: any; hour: any; min: any; message: any; }; }) {
  const email = process.env.LOGGED_IN_USER!;
  console.log(email)

  try {
    connectionToDatabase();
    const { recieveEmails, day, hour, min, message } = await request.json();
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return NextResponse.json({ error: "user does not exist" });
    }
    
    console.log(recieveEmails, day, hour, min, message)
    const scheduleDate = min+" "+hour+" * * "+day

    await User.findOneAndUpdate({email: email}, {$set: {sendEmail: recieveEmails, schedule: scheduleDate, reminder: message}}, { new: true })
    
    return NextResponse.json({ message: "user logged in", status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "error in server", status: 500 });
  }
}
