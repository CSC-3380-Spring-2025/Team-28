"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

//Accept hobby and paramURL arguments from the hobby page that displays hobby trackers
type componentProps = {
  hobby: string | undefined;
  paramURL: string;
};

export default function EditCollections({
  hobby,
  paramURL,
}: componentProps): JSX.Element {
  //useStates
  //Set the new title of the item
  const [title, setTitle] = useState("");
  //Set the new description of the item
  const [description, setDescription] = useState("");
  //Setup router to redirect users to proper pages
  const router = useRouter();

  return (
    <>
      <div className="px-10">
        {/*Title of page*/}
        <div className="pt-[1.5vh] pb-[1.5vh]">
          <h1 className="font-bold text-black text-2xl">
            Edit Item in Collection
          </h1>
        </div>
        {/*Form to submit item name  and description to database*/}
        <form onSubmit={(e) => e.preventDefault()}>
          {/*Name input*/}
          <div className="grid grid-cols-1 pb-[1.5vh]">
            <label className="font-normal text-black text-lg col-span-1">
              Item Name
            </label>
            <input
              type="text"
              placeholder="Enter name"
              onChange={(e) => setTitle(e.target.value)}
              className="border-black border-2 border-solid rounded-sm p-[0.5vh] bg-gray-200 col-span-1"
            ></input>
          </div>
          {/*Description input*/}
          <div className="grid grid-cols-1 pb-[1.5vh]">
            <label className="font-normal text-black text-lg col-span-1">
              Item Description
            </label>
            <textarea
              className="border-black border-2 border-solid rounded-sm pt-[1.5vh] pb-[1.5vh] bg-gray-200 col-span-1"
              placeholder="Enter description"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          {/*Edit button - submits data to database and edits the information for corresponding document*/}
          <button
            type="submit"
            className="p-[1.5vh] bg-black text-white rounded-md font-bold mr-[1.5vh]"
            onClick={async () => {
              await axios.post("/api/collections/editImage", {
                title,
                imageURL: paramURL,
                description,
              });
              router.push(`/dashboard/hobby/${hobby}/collections`);
            }}
          >
            Edit
          </button>
          {/*Cancel button - moves user back to the main Collections tracker page*/}
          <button
            className="p-[1.5vh] bg-gray-200 text-black rounded-md font-bold"
            onClick={() => router.push(`/dashboard/hobby/${hobby}/collections`)}
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
}
