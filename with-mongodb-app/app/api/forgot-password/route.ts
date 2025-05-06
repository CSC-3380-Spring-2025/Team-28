import connectionToDatabase from "@/lib/mongoose";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: {
  json: () =>
    | PromiseLike<{ name: any; email: any; password: any }>
    | { name: any; email: any; password: any };
}) {
  try {
    connectionToDatabase();
    const { email, password } = await request.json();
    const hashPass = await bcrypt.hash(password, 10);
    const filter = { email: email };
    const update = { password: hashPass };

    const userExist = await User.findOne(filter);
    if (!userExist) {
        return NextResponse.json({ error: "user does not exist" });
    }
    else{
        await User.updateOne(filter, update);
        return NextResponse.json({ message: "password changed", status: 201 });
    }
  } catch (err) {
    return NextResponse.json({ error: "error in server", status: 500 });
  }
}