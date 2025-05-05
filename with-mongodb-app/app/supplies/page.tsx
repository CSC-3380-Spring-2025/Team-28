"use client";

import React, { useRef } from "react";
import { ActiveTable } from "active-table-react";

type ActiveTableComp = typeof ActiveTable;

export default function Supplies() {
  const tableRef = useRef<React.ElementRef<ActiveTableComp>>(null);

  const calTotal = () => {
    const tableArray = tableRef.current?.getData();
    const tableLength = tableArray?.length;
    if (tableLength != undefined && tableArray != undefined) {
      for (let index = 1; index < tableLength; index++) {
        const cost = parseFloat(String(tableArray[index][1]));
        const amount = parseFloat(String(tableArray[index][2]));
        const total = (cost * amount).toString();

        tableRef.current?.updateCell({
          rowIndex: index,
          columnIndex: 3,
          newText: total,
        });
      }
    }
  };

  const saveTable = () => {
    const tableArray = tableRef.current?.getData();
    if (tableArray != undefined) {
      console.log(tableArray);
    }
  };

  function loadTable(): void {
    tableRef.current?.updateData([
      ["Supply Name", "Cost per Unit", "Amount", "Total"],
      ["", "4", "5", "12"],
    ]);
    return 
  }

  return (
    <>
      <div className="p-8">
        <h1 className="p-8 font-bold text-7xl mb-9">Supplies</h1>
        <button
          onClick={calTotal}
          className="px-2 py-2 bg-black text-white rounded"
        >
          Recalculate Total Cost
        </button>
        <button
          onClick={saveTable}
          className="px-2 py-2 bg-black text-white rounded"
        >
          Save Table
        </button>
        <div className="grid-flow-col grid-rows-3 gap-4 flex">
          <div className="p-8">
            <ActiveTable
              customColumnsSettings={[
                {
                  headerName: "Total",
                  defaultText: "N/A",
                  isCellTextEditable: false,
                },
              ]}
              onRender={loadTable}
              ref={tableRef}
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
              data={[["Supply Name", "Cost per Unit", "Amount", "Total"]]}
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
    </>
  );
}
