"use client";

import { Separator } from "@/components/ui/separator";
import React from "react";
import Link from "next/link";

export default function Supplies() {
  return (
    <div>
      <h1 className="p-8 font-bold text-7xl mb-9">Supplies</h1>
      <div className="grid-flow-col grid-rows-3 gap-4 flex">
        <div className="border-4 border-black rounded-md row-span-3 ml-5">
          <table className="border-collapse border border-gray-400">
            <thead>
              <tr className="border-black border-4 bg-black text-white">
                <th>Supply Name</th>
                <th>Amount</th>
                <th>Cost Per Unit</th>
                <th>Total Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-black border-4">Temp</td>
                <td className="border-black border-4">Temp</td>
                <td className="border-black border-4">Temp</td>
                <td className="border-black border-4">Temp</td>
              </tr>
              <tr>
                <td className="border-black border-4">Temp</td>
                <td className="border-black border-4">Temp</td>
                <td className="border-black border-4">Temp</td>
                <td className="border-black border-4">Temp</td>
              </tr>
              <tr>
                <td className="border-black border-4">Temp</td>
                <td className="border-black border-4">Temp</td>
                <td className="border-black border-4">Temp</td>
                <td className="border-black border-4">Temp</td>
              </tr>
              <tr>
                <td className="border-black border-4">Temp</td>
                <td className="border-black border-4">Temp</td>
                <td className="border-black border-4">Temp</td>
                <td className="border-black border-4">Temp</td>
              </tr>
              <tr>
                <td className="border-black border-4">Temp</td>
                <td className="border-black border-4">Temp</td>
                <td className="border-black border-4">Temp</td>
                <td className="border-black border-4">Temp</td>
              </tr>
              <tr>
                <td className="border-black border-4">Temp</td>
                <td className="border-black border-4">Temp</td>
                <td className="border-black border-4">Temp</td>
                <td className="border-black border-4">Temp</td>
              </tr>
              <tr>
                <td className="border-black border-4">Temp</td>
                <td className="border-black border-4">Temp</td>
                <td className="border-black border-4">Temp</td>
                <td className="border-black border-4">Temp</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <div className="border-4 border-black rounded-md text-black col-span-2 mb-1">
            <h2 className="bg-black text-white">Supply Alert</h2>
            <div>Temp</div>
          </div>
          <div className="border-4 border-black rounded-md text-black col-span-2 row-span-2 mt-2 mb-1">
            <h2 className="bg-black text-white">Financial Chart</h2>
            <div>Temp</div>
          </div>
        </div>
      </div>
    </div>
  );
}
