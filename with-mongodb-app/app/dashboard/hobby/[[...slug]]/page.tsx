"use client";

import { useEdgeStore } from "@/lib/edgestore";
import axios from "axios";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function HobbyPage() {
  //Setup
  //next/navigation things
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  //Parameters from url
  const hobby = params.slug[0];
  const tracker = params.slug[1];
  const desc = params.slug[2];
  const paramURL = searchParams.get("url");
  //useStates
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [titles, setTitles] = useState<string[]>([]);
  const [indImage, setIndImage] = useState<string | null>(null);
  const [indTitle, setIndTitles] = useState("");
  const [indDate, setIndDate] = useState("");
  const [indDesc, setIndDesc] = useState("");
  const [x, setX] = useState(0);
  //for add page
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();

  async function fetchHobbyTracker() {
    const response = await axios.post("/api/hobbyPage", { hobby, tracker });
    setX(response.data.status);
    console.log(response.data);
    console.log(x);
  }

  //Collection Page
  async function fetchImages() {
    const response = await axios.get("/api/collections/fetchImages");
    setImageURLs(response.data.imageURL);
    setTitles(response.data.title);
    console.log(imageURLs);
    console.log(response);
  }

  async function fetchIndividualImage(url: string) {
    const response = await axios.post("/api/collections/fetchSingleImage", {
      url,
    });
    setIndTitles(response.data.title);
    setIndDate(response.data.date);
    setIndImage(response.data.imageURL);
    setIndDesc(response.data.description);
    console.log(response);
  }

  async function individualImageReroute(url: string) {
    const shortURL = encodeURIComponent(url);
    router.push(`/dashboard/hobby/${hobby}/${tracker}/?url=${shortURL}`);
  }

  async function deleteImage(url: string){
    await axios.post("/api/collections/deleteImage", {url})
    router.push(`/dashboard/hobby/${hobby}/${tracker}`);
  }

  useEffect(() => {
    fetchHobbyTracker();
    if (tracker === "collections") {
      if (paramURL) {
        fetchIndividualImage(paramURL);
      } else {
        fetchImages();
      }
    } else if (tracker === "blog") {
    } else if (tracker === "supplies") {
    }
  }, [tracker, paramURL]);

  if (x == 201) {
    if (tracker === "collections") {
      if (paramURL) {
        if (paramURL === "add") {
          const handleSubmit = async (e: { preventDefault: () => void }) => {
            e.preventDefault();
          };
          return (
            <div className="px-10">
              <div className="pt-[1.5vh] pb-[1.5vh]">
                <h1 className="font-bold text-black text-2xl">
                  Add New Item to Collection
                </h1>
              </div>
              <form onSubmit={handleSubmit}>
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
                <button className="p-[1.5vh] bg-gray-200 text-black rounded-md font-bold" onClick={() => router.push(`/dashboard/hobby/${hobby}/collections`)}>
                  Cancel
                </button>
              </form>
            </div>
          );
        } else if (desc === "edit") {
          const handleSubmit = async (e: { preventDefault: () => void }) => {
            e.preventDefault();
          };
          return (
            <div className="px-10">
              <div className="pt-[1.5vh] pb-[1.5vh]">
                <h1 className="font-bold text-black text-2xl">
                  Edit Item in Collection
                </h1>
              </div>
              <form onSubmit={handleSubmit}>
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
                <button className="p-[1.5vh] bg-gray-200 text-black rounded-md font-bold" onClick={() => router.push(`/dashboard/hobby/${hobby}/collections`)}>
                  Cancel
                </button>
              </form>
            </div>
          );
        } else {
          return (
            <>
              <div className="px-10">
                <div className="grid grid-cols-2 w-full">
                  <div className="pt-[1.5vh] pb-[1.5vh] col-span-1 place-self-start">
                    <h1 className="font-bold text-black text-2xl">
                      {indTitle}
                    </h1>
                  </div>
                  <div className="pt-[1.5vh] pb-[1.5vh] col-span-1 place-self-end">
                    <button
                      type="button"
                      className="p-[1.5vh] bg-black text-white rounded-md font-bold mr-[1.5vh]"
                      onClick={() => router.push(`/dashboard/hobby/${hobby}/collections/edit?url=${paramURL}`)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="p-[1.5vh] bg-[#ED2727] text-white rounded-md font-bold mr-[1.5vh]"
                      onClick={() => deleteImage(paramURL)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div>
                  <span>{indDate}</span>
                </div>
                <div>
                  <div className="w-1/2 h-1/2">
                    <img src={indImage}></img>
                  </div>
                  <div>
                    <p>{indDesc}</p>
                  </div>
                </div>
              </div>
            </>
          );
        }
      } else {
        return (
          <>
            <div className="px-10 max-w-full">
              <div className="grid grid-cols-2">
                <div className="pt-[1.5vh] pb-[1.5vh] col-span-1 place-self-start">
                  <h1 className="font-bold text-black text-2xl">Collection</h1>
                </div>
                <div className="pt-[1.5vh] pb-[1.5vh] col-span-1 place-self-end">
                  <button
                    type="button"
                    className="p-[1.5vh] bg-black text-white rounded-md font-bold mr-[1.5vh]"
                    onClick={() => router.push(`/dashboard/hobby/${hobby}/collections?url=add`)}
                  >
                    Add Image
                  </button>
                </div>
              </div>
              <div>
                <div className="grid grid-cols-4">
                  {imageURLs.map((url, index) => (
                    <div
                      key={index}
                      onClick={() => individualImageReroute(url)}
                      className="col-span-1 w-[15vw] h-[20vh] border-2 border-black rounded-md mt-[5vh] mb-[5vh] mr-[5vw]"
                    >
                      <img src={url} className="w-full h-full rounded-sm"></img>
                      <div className="flex justify-center justify-items-center">
                        <p className="font-semibold text-center">{titles[index]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        );
      }
    } else if (tracker === "blog") {
    } else if (tracker === "supplies") {
    }
  } else {
    return (
      <h1>
        {" "}
        viewing page for hobby {hobby} and tracker type {tracker}{" "}
      </h1>
    );
  }
}
