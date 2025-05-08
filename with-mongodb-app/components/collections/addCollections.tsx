"use client";

import { useEdgeStore } from "@/lib/edgestore";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

//This is the component that will display the add item to collection page
//Accept hobby argument from the hobby page that displays hobby trackers
type componentProps = {
  hobby: string | undefined;
};

export default function AddCollections({ hobby }: componentProps): JSX.Element {
  //useStates
  //Set the title of the item
  const [title, setTitle] = useState("");
  //Set the description of the item
  const [description, setDescription] = useState("");
  //Set the image of the item
  const [file, setFile] = useState<File>();
  //Setup edgestore to store images into the cloud storage
  const { edgestore } = useEdgeStore();
  //Setup router to redirect users to proper pages
  const router = useRouter();

  return (
    <>
      <div className="px-10">
        {/*Title of page*/}
        <div className="pt-[1.5vh] pb-[1.5vh]">
          <h1 className="font-bold text-black text-2xl">
            Add New Item to Collection
          </h1>
        </div>
        {/*Form to submit item name, image, and description to database*/}
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
          {/*Image input*/}
          <div className="grid grid-cols-1 pb-[1.5vh]">
            <label className="font-normal text-black text-lg col-span-1">
              Item Image
            </label>
            <input
              type="file"
              className="border-black border-2 border-solid rounded-sm p-[0.5vh] bg-gray-200 col-span-1
                    file:pt-[1vh] file:pb-[1vh] file:px-6 file:border-0 file:text-md file:font-normal file:bg-none file:text-black"
              onChange={(e) => {
                setFile(e.target.files?.[0]);
              }}
            />
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
          {/*Add button - submits data to database and creates new item document in Collections collection*/}
          <button
            type="submit"
            className="p-[1.5vh] bg-black text-white rounded-md font-bold mr-[1.5vh]"
            onClick={async () => {
              if (file) {
                const res = await edgestore.myPublicImages.upload({
                  file,
                });
                await axios.post("/api/collections/addImage", {
                  title,
                  imageURL: res.url,
                  description,
                  hobby,
                });
                router.push(`/dashboard/hobby/${hobby}/collections`);
              }
            }}
          >
            Add
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
