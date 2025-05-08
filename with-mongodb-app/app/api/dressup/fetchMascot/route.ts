import connectionToDatabase from "@/lib/mongoose";
import { Mascot } from "@/models/mascot";
import { NextResponse } from "next/server";

// Default items with layers
const DEFAULT_ITEMS = [
  { filename: "wizard-hat.png", layer: "hat" },
  { filename: "green-shirt.png", layer: "shirt" },
  { filename: "red-shirt.png", layer: "shirt" },
  { filename: "blue-jeans.png", layer: "pants" },
  { filename: "khakis.png", layer: "pants" },
  { filename: "sunglasses.png", layer: "accessory" },
  { filename: "cowboy-hat.png", layer: "hat" },
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
        equipped: {}, //by default nothing is equipped
        inventory: DEFAULT_ITEMS,
      });
    } else {
      mascot.inventory = mascot.inventory
        .filter((item: { filename: any; layer: any; }) => item && item.filename && item.layer) //this fixes things equipped from testing
        .map((item: { filename: any; layer: any; }) => ({
          filename: item.filename,
          layer: item.layer
        }));

      DEFAULT_ITEMS.forEach((defaultItem) => {
        if (!mascot.inventory.some((item: { filename: string; }) => item.filename === defaultItem.filename)) {
          mascot.inventory.push(defaultItem);
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
