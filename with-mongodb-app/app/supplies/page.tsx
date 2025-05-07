"use client";

import React, { useRef } from "react";
import { ActiveTable } from "active-table-react";
import axios from "axios";
import { useState } from "react";

type ActiveTableComp = typeof ActiveTable;

export default function Supplies() {

  //acts as a reference to the table array for other functions to easily get data from it
  const tableRef = useRef<React.ElementRef<ActiveTableComp>>(null);

  //wanted to use this to allow automatic syncing with the database 
  // but I just had issues and could never get it to work, but this just gets the state of the table array and saves the value
  let [tableArray, setArray] = useState();

  //Tried to integrate with the database but had issues, depricated basically
  const handleSubmit = async () => {
    const tableArray = tableRef.current?.getData();
    console.log(tableArray);
    const response = await axios.post("/api/supplies", {
      tableArray,
    });
    console.log(response);
  };

  //This automatically updates the table for
  const updateTable = () => {
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

  //It is just loading a default table right now, the first row is a header while the rest are sports for actual info
  const loadTable = () => {
    tableRef.current?.updateData([
      ["Supply Name", "Cost per Unit", "Amount", "Total"],
      ["", "", "", ""],
      ["", "", "", ""],
      ["", "", "", ""],
      ["", "", "", ""],
      ["", "", "", ""],
      ["", "", "", ""],
      ["", "", "", ""],
      ["", "", "", ""],
      ["", "", "", ""],
      ["", "", "", ""],
    ]);
    return;
  };

  return (
    <>
      <div className="p-8">
        <h1 className="p-8 font-bold text-7xl mb-9">Supplies</h1>
        <div className="grid-flow-col grid-rows-3 gap-4 flex">
          <div className="p-8">
            {/* this is table for the supplies page */}
            <ActiveTable
            // this is the settings for the files button
              files={{ buttons: [{ import: true }, { export: true }] }}
              // settings for how pages work for the table
              pagination={{
                rowsPerPage: 10,
                rowsPerPageSelect: false,
              }}
              // This makes it so that the Total column is not editable by the user and will only be updated when the total is being calculated
              customColumnsSettings={[
                {
                  headerName: "Total",
                  defaultText: "NaN",
                  isCellTextEditable: false,
                },
              ]}
              //For the user there are only 30 useable rows, but the reason it is 31 is for the header
              maxRows={31}
              //using onRender I am loading a default table, but wanted to use it to load a table from the database
              onRender={loadTable}
              //this is updates the Total section of the table whenever any cell is updated
              onCellUpdate={updateTable}
              //basically depricated, tried usining this to save the table until I wanted to upload it to the database
              onDataUpdate={(e) => setArray}
              //reference for the table
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
        </div>
      </div>
    </>
  );
}
