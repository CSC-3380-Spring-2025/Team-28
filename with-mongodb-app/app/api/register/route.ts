import connectionToDatabase from "@/lib/mongoose";
import User from "@/models/user";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: {
  json: () =>
    | PromiseLike<{ name: any; email: any; password: any }>
    | { name: any; email: any; password: any };
}) {
  try {
    connectionToDatabase();
    const { name, email, password } = await request.json();
    const hobbies = [""];
    const schedule = "";
    const reminder = ["", "", ""];
    const userExist = await User.findOne({ email });
    if (userExist) {
      return NextResponse.json({ error: "user already exists" });
    }
    const hashPass = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashPass,
      hobbies,
      schedule,
      reminder,
    });
    await newUser.save();
    return NextResponse.json({ message: "user registered", status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "error in server", status: 500 });
  }
}
