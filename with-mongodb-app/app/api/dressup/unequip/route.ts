import connectionToDatabase from "@/lib/mongoose";
import { Mascot } from "@/models/mascot";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectionToDatabase();

    //temp
    const userId = "fake1234";
    const { layer } = await request.json();

    if (!layer) {
      return NextResponse.json(
        { error: "Layer is required to unequip." },
        { status: 400 }
      );
    }

    const mascot = await Mascot.findOne({ userId });

    if (!mascot) {
      return NextResponse.json(
        { error: "Mascot not found for this user." },
        { status: 404 }
      );
    }

    delete mascot.equipped[layer];
    await mascot.save();

    return NextResponse.json({
      message: "Item unequipped successfully.",
      equipped: mascot.equipped,
    });
  } catch (error) {
    console.error("Error unequipping item:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
