import connectionToDatabase from "@/lib/mongoose";
import { Mascot } from "@/models/mascot";
import { NextResponse } from "next/server";

const DEFAULT_ITEMS = [
  "wizard-hat.png",
  "green-hoodie.png",
  "jeans.png",
  "sunglasses.png",
  "cowboy-hat.png",
  "dragon-cape.png"
];

export async function GET() {
  try {
    await connectionToDatabase();

    //temp
    const userId = "fake1234";
    let mascot = await Mascot.findOne({ userId });

    if (!mascot) {
      mascot = await Mascot.create({
        userId,
        equipped: {}, //be default we equip nothing
        inventory: DEFAULT_ITEMS,
      });
    } else {
      DEFAULT_ITEMS.forEach((item) => {
        if (!mascot.inventory.includes(item)) {
          mascot.inventory.push(item);
        }
      });
      await mascot.save();
    }

    return NextResponse.json({
      equipped: mascot.equipped,
      inventory: mascot.inventory,
    });
  } catch (error) {
    console.error("Error fetching mascot data:", error);
    return NextResponse.json({ error: "Failed to fetch mascot data" }, { status: 500 });
  }
}
