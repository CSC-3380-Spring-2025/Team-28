"use client";

import { Separator } from "@/components/ui/separator";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import dynamic from "next/dynamic";
import { teardownTraceSubscriber } from "next/dist/build/swc/generated-native";
import { TableData } from "active-table/dist/types/tableData";

const  updateCell = (dataUpdate: any) =>  {
    console.log(dataUpdate)
  }

export default function Supplies() {
  const ActiveTable = dynamic(
    () => import("active-table-react").then((mod) => mod.ActiveTable),
    {
      ssr: false,
    }
  );
   
  

  

  return (
    <div className="p-8">
      <h1 className="p-8 font-bold text-7xl mb-9">Supplies</h1>
      <div className="grid-flow-col grid-rows-3 gap-4 flex">
        <div>
          <ActiveTable
            onDataUpdate={updateCell}
            id="active-table"
            isHeaderTextEditable={false}
            displayAddNewColumn={false}
            columnDropdown={{ displaySettings: { isAvailable: false } }}
            tableStyle={{ borderRadius: "5px", border: "unset" }}
            stripedRows={{
              odd: { backgroundColor: "" },
              even: { backgroundColor: "#ebebeb7a" },
            }}
            headerStyles={{
              default: {
                backgroundColor: "#000000",
                color: "white",
                borderRight: "1px solid #00000029",
              },
            }}
            data={[
              ["Supply Name", "Cost per Unit", "Amount", "Total"],
              ["Glue", "3", "4"],
            ]}
          />
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
