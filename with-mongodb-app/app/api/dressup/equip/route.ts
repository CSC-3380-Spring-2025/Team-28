import connectionToDatabase from "@/lib/mongoose";
import { Mascot } from "@/models/mascot";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectionToDatabase();

    
    //temp
    const userId = "fake1234"; 

    const body = await request.json();
    const { layer, item } = body;

    if (!layer || !item) {
      return NextResponse.json(
        { error: "Layer and item are required" },
        { status: 400 }
      );
    }

    const mascot = await Mascot.findOne({ userId });

    if (!mascot) {
      return NextResponse.json(
        { error: "Mascot not found for this user" },
        { status: 404 }
      );
    }

    mascot.equipped[layer] = item;
    await mascot.save();

    return NextResponse.json({
      message: "Item equipped successfully",
      equipped: mascot.equipped
    });
  } catch (error) {
    console.error("Error equipping item:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
