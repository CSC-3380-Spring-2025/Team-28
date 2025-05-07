"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type MascotData = {
  equipped: Record<string, string>; //needs layer and filename
  inventory: string[];
};

export default function DressupPage() {
  const [mascot, setMascot] = useState<MascotData | null>(null);

  useEffect(() => {
    const fetchMascot = async () => {
      const res = await fetch("/api/dressup/fetchMascot");
      const data = await res.json();
      setMascot(data);
    };
    fetchMascot();
  }, []);

  const handleEquip = async (item: string) => {
    const layer = prompt("Which layer should this item be equipped to? (hat, shirt, pants)");

    if (!layer) return;

    const res = await fetch("/api/dressup/equip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ layer, item }),
    });

    const data = await res.json();

    if (data.equipped) {
      setMascot((prev) => (prev ? { ...prev, equipped: data.equipped } : null));
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/*sidebar*/}
      <div className="w-12 bg-black text-white">☰</div>

      {/*general layout*/}
      <div className="flex flex-grow px-6 py-4 gap-6">
        {/*clothing category selector (left panel)*/}
        <div className="w-1/4 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            {["Shirts", "Pants", "Hats", "Accessories"].map((category) => (
              <button
                key={category}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-left"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/*mascot display (center panel)*/}
        <div className="w-1/2 flex flex-col items-center">
          <div className="relative w-[300px] h-[500px] bg-gray-100 border border-gray-400 rounded-md flex items-center justify-center">
            {/*base mascot image (always visible)*/}
            <img
              src="/mascot.png"
              alt="Base Mascot"
              className="absolute w-full h-full object-contain pointer-events-none"
            />

            {/*stacked equipped layers*/}
            {mascot &&
              Object.entries(mascot.equipped).map(([layer, filename]) => (
                <img
                  key={layer}
                  src={`/layers/${filename}`}
                  alt={layer}
                  className="absolute w-full h-full object-contain pointer-events-none"
                />
              ))}
          </div>
          <p className="mt-4 text-lg font-medium">Your Mascot</p>
        </div>

        {/*item grid (right panel)*/}
        <div className="w-1/4 overflow-y-auto h-[80vh] bg-gray-100 p-4 rounded-lg">
          {/*inventory item grid*/}
          <div className="grid grid-cols-3 gap-4">
            {mascot?.inventory.map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                {/*clickable inventory item*/}
                <img
                  src={`/layers/${item}`}
                  alt={item}
                  className="w-16 h-16 object-contain border border-gray-400 rounded-md cursor-pointer"
                  onClick={() => handleEquip(item)}
                />
                <span className="text-sm mt-1">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
