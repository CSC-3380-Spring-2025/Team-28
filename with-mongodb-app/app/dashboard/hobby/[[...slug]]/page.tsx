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
  //useStates for collections
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [titles, setTitles] = useState<string[]>([]);
  const [indImage, setIndImage] = useState<string | null>(null);
  const [indTitle, setIndTitles] = useState("");
  const [indDate, setIndDate] = useState("");
  const [indDesc, setIndDesc] = useState("");
  const [x, setX] = useState(0);
  //useStates for blog tracker
  const [blogTitles, setBlogTitles] = useState<string[]>([]);
  const [blogContents, setBlogContents] = useState<string[]>([]);
  const [blogIDs, setBlogIDs] = useState<string[]>([]);
  const [indBlogID, setIndBlogID] = useState("")
  const [indBlogTitle, setIndBlogTitle] = useState("");
  const [indBlogDate, setIndBlogDate] = useState("");
  const [indBlogContent, setIndBlogContent] = useState("");
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
    const response = await axios.post("/api/collections/fetchImages", {
      hobby,
    });
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

  async function deleteImage(url: string) {
    await axios.post("/api/collections/deleteImage", { url });
    router.push(`/dashboard/hobby/${hobby}/${tracker}`);
  }

  //Blog Page
  async function fetchBlogPosts() {
    const response = await axios.post("/api/blog-post/fetchBlogPosts", {
      hobby,
    });
    setBlogContents(response.data.content);
    setBlogTitles(response.data.title);
    setBlogIDs(response.data._id)
  }

  async function fetchIndividualBlogPost(id: string) {
    const response = await axios.post("/api/blog-post/fetchSingleBlogPost", {
      id,
    });
    setIndBlogID(response.data._id)
    setIndBlogTitle(response.data.title);
    setIndBlogDate(response.data.date);
    setIndBlogContent(response.data.content);
  }

  async function individualBlogPostReroute(id: string) {
    const shortURL = encodeURIComponent(id);
    router.push(`/dashboard/hobby/${hobby}/${tracker}/?url=${shortURL}`);
  }

  async function deleteBlogPost(id: string) {
    await axios.post("/api/blog-post/deleteBlogPost", { id });
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
      if (paramURL) {
        fetchIndividualBlogPost(paramURL);
      } else {
        fetchBlogPosts();
      }
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
                <button
                  className="p-[1.5vh] bg-gray-200 text-black rounded-md font-bold"
                  onClick={() =>
                    router.push(`/dashboard/hobby/${hobby}/collections`)
                  }
                >
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
                <button
                  className="p-[1.5vh] bg-gray-200 text-black rounded-md font-bold"
                  onClick={() =>
                    router.push(`/dashboard/hobby/${hobby}/collections`)
                  }
                >
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
                      onClick={() =>
                        router.push(
                          `/dashboard/hobby/${hobby}/collections/edit?url=${paramURL}`
                        )
                      }
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
                    onClick={() =>
                      router.push(
                        `/dashboard/hobby/${hobby}/collections?url=add`
                      )
                    }
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
                        <p className="font-semibold text-center">
                          {titles[index]}
                        </p>
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
      if (paramURL) {
        if (paramURL === "add") {
          const handleSubmit = async (e: { preventDefault: () => void }) => {
            e.preventDefault();
            try {
              console.log(indBlogTitle);
              console.log(indBlogContent);
              await axios.post("/api/blog-post/addBlogPost", {
                title: indBlogTitle,
                content: indBlogContent,
                hobby,
              });
            } catch (err) {
              console.log(err);
            }
            router.push(`/dashboard/hobby/${hobby}/${tracker}`);
          };
          return (
            <div className="px-10">
              <div className="pt-[1.5vh] pb-[1.5vh]">
                <h1 className="font-bold text-black text-2xl">
                  Add New Post to Blog
                </h1>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 pb-[1.5vh]">
                  <label className="font-normal text-black text-lg col-span-1">
                    Post Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    onChange={(e) => setIndBlogTitle(e.target.value)}
                    className="border-black border-2 border-solid rounded-sm p-[0.5vh] bg-gray-200 col-span-1"
                  ></input>
                </div>
                <div className="grid grid-cols-1 pb-[1.5vh]">
                  <label className="font-normal text-black text-lg col-span-1">
                    Post Content
                  </label>
                  <textarea
                    className="border-black border-2 border-solid rounded-sm pt-[1.5vh] pb-[1.5vh] bg-gray-200 col-span-1"
                    placeholder="Enter description"
                    onChange={(e) => setIndBlogContent(e.target.value)}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="p-[1.5vh] bg-black text-white rounded-md font-bold mr-[1.5vh]"
                >
                  Add
                </button>
                <button
                  className="p-[1.5vh] bg-gray-200 text-black rounded-md font-bold"
                  onClick={() =>
                    router.push(`/dashboard/hobby/${hobby}/${tracker}`)
                  }
                >
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
                  Edit Post in Blog
                </h1>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 pb-[1.5vh]">
                  <label className="font-normal text-black text-lg col-span-1">
                    Post Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter title"
                    onChange={(e) => setIndBlogTitle(e.target.value)}
                    className="border-black border-2 border-solid rounded-sm p-[0.5vh] bg-gray-200 col-span-1"
                  ></input>
                </div>
                <div className="grid grid-cols-1 pb-[1.5vh]">
                  <label className="font-normal text-black text-lg col-span-1">
                    Post Content
                  </label>
                  <textarea
                    className="border-black border-2 border-solid rounded-sm pt-[1.5vh] pb-[1.5vh] bg-gray-200 col-span-1"
                    placeholder="Enter content"
                    onChange={(e) => setIndBlogContent(e.target.value)}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="p-[1.5vh] bg-black text-white rounded-md font-bold mr-[1.5vh]"
                  onClick={async () => {
                    await axios.post("/api/blog-post/editBlogPost", {
                      title: indBlogTitle,
                      id: paramURL,
                      content: indBlogContent,
                    });
                    router.push(`/dashboard/hobby/${hobby}/${tracker}`);
                  }}
                >
                  Edit
                </button>
                <button
                  className="p-[1.5vh] bg-gray-200 text-black rounded-md font-bold"
                  onClick={() =>
                    router.push(`/dashboard/hobby/${hobby}/${tracker}`)
                  }
                >
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
                      {indBlogTitle}
                    </h1>
                  </div>
                  <div className="pt-[1.5vh] pb-[1.5vh] col-span-1 place-self-end">
                    <button
                      type="button"
                      className="p-[1.5vh] bg-black text-white rounded-md font-bold mr-[1.5vh]"
                      onClick={() =>
                        router.push(
                          `/dashboard/hobby/${hobby}/${tracker}/edit?url=${paramURL}`
                        )
                      }
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="p-[1.5vh] bg-[#ED2727] text-white rounded-md font-bold mr-[1.5vh]"
                      onClick={() => deleteBlogPost(paramURL)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div>
                  <span>{indBlogDate}</span>
                </div>
                <div>
                  <div>
                    <p>{indBlogContent}</p>
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
                  <h1 className="font-bold text-black text-2xl">Blog</h1>
                </div>
                <div className="pt-[1.5vh] pb-[1.5vh] col-span-1 place-self-end">
                  <button
                    type="button"
                    className="p-[1.5vh] bg-black text-white rounded-md font-bold mr-[1.5vh]"
                    onClick={() =>
                      router.push(
                        `/dashboard/hobby/${hobby}/${tracker}?url=add`
                      )
                    }
                  >
                    Add Post
                  </button>
                </div>
              </div>
              <div>
                <div className="grid grid-cols-4">
                  {blogContents.map((content, index) => (
                    <div
                      key={blogIDs[index].toString()}
                      onClick={() => individualBlogPostReroute(blogIDs[index].toString())}
                      className="col-span-1 w-[15vw] h-[20vh] border-2 border-black rounded-md mt-[5vh] mb-[5vh] mr-[5vw]"
                    >
                      <div className="flex justify-center justify-items-center">
                        <p className="font-semibold text-center">
                          {blogTitles[index]}
                        </p>
                      </div>
                      <div className="flex justify-center justify-items-center">
                        <p className="font-normal text-center text-black truncate">
                          {content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        );
      }
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
