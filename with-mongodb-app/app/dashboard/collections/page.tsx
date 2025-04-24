"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Collections() {
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [titles, setTitles] = useState<string[]>([]);
  //const [ids, setIds] = useState<string[]>([])

  useEffect(() => {
    async function fetchImages() {
      const response = await axios.get("/api/collections/fetchImages");
      setImageURLs(response.data.imageURL);
      setTitles(response.data.title);
      //setIds(response.data._id)
      console.log(imageURLs);
      console.log(response);
    }
    fetchImages();
  }, []);

  return (
    <>
      <div className="px-10">
        <div className="pt-[1.5vh] pb-[1.5vh]">
          <h1 className="font-bold text-black text-2xl">Collection</h1>
        </div>
        <div>
          <button type="button">Add Image</button>
          <div className="grid grid-cols-4">
            {imageURLs.map((url, index) => (
              <div key={index}className="col-span-1 w-[15vw] h-[20vh] border-2 border-black rounded-md mt-[5vh] mb-[5vh] mr-[5vw]">
                <img src={url} className="w-full h-full rounded-sm"></img>
                  <p>{titles[index]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
