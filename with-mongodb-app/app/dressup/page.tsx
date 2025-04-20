"use client";

export default function DressupPage() {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/*sidebar*/}
      <div className="w-12 bg-black text-white">☰</div>

      {/*general layout*/}
      <div className="flex flex-grow px-6 py-4 gap-6">
        {/*where you select which part to customize*/}
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

        {/*mascot*/}
        <div className="w-1/2 flex flex-col items-center">
            <div className="relative w-[300px] h-[800px] bg-gray-100 border border-gray-400 rounded-md flex items-center justify-center">
            <span className="text-gray-500">Mascot Placeholder</span>
        </div>

<p className="mt-4 text-lg font-medium">Your Mascot</p>

          {/*does the mascot need a name???*/}
        </div>

        <div className="w-1/4 overflow-y-auto h-[80vh] bg-gray-100 p-4 rounded-lg">
            {/*box where all the items they earn are*/}
            <div className="grid grid-cols-3 gap-4">
                {Array.from({ length: 15 }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-white border border-gray-400 rounded-md" />
                        <span className="text-sm mt-1">Item {i + 1}</span>
                    </div>
                ))}
            </div>

        </div>

      </div>
    </div>
  );
}
