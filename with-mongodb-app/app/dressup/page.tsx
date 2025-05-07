"use client";

import { useEffect, useState } from "react";

type MascotData = {
  equipped: Record<string, string>; //need strings for item and layer
  inventory: { filename: string; layer: string }[]; //same thing
};

export default function DressupPage() {
  
  const [mascot, setMascot] = useState<MascotData | null>(null); //sets the mascot data
  const [selectedCategory, setSelectedCategory] = useState<string>("all"); //tracks the layer

  useEffect(() => {
    const fetchMascot = async () => {
      const res = await fetch("/api/dressup/fetchMascot");
      const data = await res.json();
      setMascot(data);
    };
    fetchMascot();
  }, []);

  //lets you filter items
  const filteredInventory = mascot?.inventory
    ? mascot.inventory.filter((item) => 
      selectedCategory === "all" || item.layer === selectedCategory
    )
    : []; //made an else just in case to fix error I was getting from node where nothing loaded

  const handleEquip = async (item: { filename: string; layer: string }) => {
    const isEquipped = mascot?.equipped[item.layer] === item.filename;

    //this loads new item right when you equip it so the state saves
    setMascot((prev) => {
      if (!prev) return prev;
      const updatedEquipped = { ...prev.equipped };

      if (isEquipped) {
        delete updatedEquipped[item.layer];
      } else {
        updatedEquipped[item.layer] = item.filename;
      }

      return { ...prev, equipped: updatedEquipped };
    });

    //this sends the request to change it 
    await fetch(`/api/dressup/${isEquipped ? "unequip" : "equip"}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        layer: item.layer,
        item: item.filename,
      }),
    });
  };



  const handleUnequip = async (layer: string) => {
    //same deal as early, updates UI right away before request is sent because otherwise it won't load
    setMascot((prev) => {
      if (!prev) return prev;
      const updatedEquipped = { ...prev.equipped };
      delete updatedEquipped[layer];
      return { ...prev, equipped: updatedEquipped };
    });

    //same as earlier, sends request to unequip
    const res = await fetch("/api/dressup/unequip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ layer }),
    });

    const data = await res.json();
    if (data.equipped) {
      setMascot((prev) => (prev ? { ...prev, equipped: data.equipped } : null));
    }
  };


  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/*layer chooser*/}
      <div className="w-1/4 flex flex-col gap-4 p-4 bg-gray-200">
        {["all", "hat", "shirt", "pants", "accessory"].map((category) => (
          <button
            key={category}
            className={`px-4 py-2 ${
              selectedCategory === category ? "bg-blue-500 text-white" : "bg-gray-300"
            } rounded-lg`}
            onClick={() => setSelectedCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/*mascot*/}
      <div className="w-1/2 flex flex-col items-center">
        <div className="relative w-[300px] h-[500px] bg-gray-100 border border-gray-400 rounded-md flex items-center justify-center">
          {/*mascot png*/}
          <img
            src="/mascot.png"
            alt="Base Mascot"
            className="absolute w-full h-full object-contain pointer-events-none"
          />

          {/*layers*/}
          {mascot?.equipped ? (
            Object.entries(mascot.equipped).map(([layer, filename]) => (
              <img
                key={layer}
                src={`/${filename}`}
                alt={layer}
                className="absolute w-full h-full object-contain cursor-pointer"
                onClick={() => handleUnequip(layer)}
                title={`Click to unequip ${layer}`}
              />
            ))
          ) : (
            <p className="text-sm text-gray-400">No items equipped.</p>
          )}


        </div>
        <p className="mt-4 text-lg font-medium">Mascot</p>
      </div>

      {/*inventory grid*/}
      <div className="w-1/4 overflow-y-auto h-[80vh] bg-gray-100 p-4 rounded-lg">
        <div className="grid grid-cols-3 gap-4">
          {filteredInventory?.map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              {/*clickable inventory item*/}
              <img
                src={`/${item.filename}`}
                alt={item.filename}
                className="w-16 h-16 object-contain border border-gray-400 rounded-md cursor-pointer"
                onClick={() => handleEquip(item)}
              />
              <span className="text-sm mt-1">{item.filename}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
