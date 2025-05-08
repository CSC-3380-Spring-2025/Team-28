import connectionToDatabase from "@/lib/mongoose";
import { Mascot } from "@/models/mascot";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectionToDatabase();

    //temp
    const userId = "fake1234"
    const { item } = await request.json();

    if (!item) {
      return NextResponse.json(
        { error: "Item name is required" },
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

    //actually add the item
    if (!mascot.inventory.includes(item)) {
      mascot.inventory.push(item);
      await mascot.save();
    }

    return NextResponse.json({
      message: "Item added to inventory",
      inventory: mascot.inventory,
    });
  } catch (error) {
    console.error("Error adding item:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
