"use client";

import AddBlog from "@/components/blog/addBlog";
import Blog from "@/components/blog/blog";
import EditBlog from "@/components/blog/editBlog";
import IndBlog from "@/components/blog/indBlog";
import AddCollections from "@/components/collections/addCollections";
import Collections from "@/components/collections/collections";
import EditCollections from "@/components/collections/editCollections";
import IndCollections from "@/components/collections/indCollections";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function HobbyPage() {
  //Setup
  //next/navigation things
  //This params constant fetches the words in the catch-all section of the url (the [[...slug]] part)...
  //...and puts them into an array as elements
  const params = useParams();
  //This params constant is used to look for optional parameters in the url
  const searchParams = useSearchParams();
  //Parameters from url
  //The first parameter after hobby - identifies what user hobby the tracker is for
  const hobby = params.slug?.[0];
  //The second parameter after hobby - identifies what tracker user requested
  const tracker = params.slug?.[1];
  //The third parameter after hobby - identifies any additonal pages navigated to ()
  //I just named it desc as short describes, as it describes any additional pages that may be navigated to
  const desc = params.slug?.[2];
  //This one is an optional parameter
  //It will check if there if there is a special id that indicates...
  //...the need to show content relating to an individual document in the database
  const paramURL = searchParams.get("url");
  //useStates
  //This one stores the status of the response from the api if a path is a valid hobby tracker path or not
  const [trackerStatus, setTrackerStatus] = useState(0);
  //useStates for collections tracker
  //This one contains all the image links to display on the main collections tracker page 
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  //This one contains all the image titles to display on the main collections tracker page 
  const [titles, setTitles] = useState<string[]>([]);
  //This one contains an item's image link to display on an individual item page
  const [indImage, setIndImage] = useState<string | null>(null);
  //This one contains an item title to display on an individual item page
  const [indTitle, setIndTitles] = useState("");
  //This one contains the date an item was added to the collections collection to display on an individual item page
  const [indDate, setIndDate] = useState("");
  //This one contains the date to display on an individual item page
  const [indDesc, setIndDesc] = useState("");
  //useStates for blog tracker
  const [blogTitles, setBlogTitles] = useState<string[]>([]);
  const [blogContents, setBlogContents] = useState<string[]>([]);
  const [blogIDs, setBlogIDs] = useState<string[]>([]);
  const [indBlogID, setIndBlogID] = useState("");
  const [indBlogTitle, setIndBlogTitle] = useState("");
  const [indBlogDate, setIndBlogDate] = useState("");
  const [indBlogContent, setIndBlogContent] = useState("");

  //This will check the document of the logged in user to see...
  //...if they created the hobby tracker they requested access to
  //It will set the trackerStatus variable to the status returned by the response of the POST request
  async function fetchHobbyTracker() {
    const response = await axios.post("/api/hobbyPage", { hobby, tracker });
    setTrackerStatus(response.data.status);
  }

  //Collection Page
  //This function will fetch all the image URLs and corresponding titles...
  //...to display on the main collections tracker page
  async function fetchImages() {
    const response = await axios.post("/api/collections/fetchImages", {
      hobby,
    });
    setImageURLs(response.data.imageURL);
    setTitles(response.data.title);
    console.log(imageURLs);
    console.log(response);
  }

  //This function will fetch an individual item's data...
  //...to display on an individual item page
  async function fetchIndividualImage(url: string) {
    const response = await axios.post("/api/collections/fetchSingleImage", {
      url,
    });
    setIndTitles(response.data.title);
    setIndDate(response.data.date);
    setIndImage(response.data.imageURL);
    setIndDesc(response.data.description);
  }

  //Blog Page
  async function fetchBlogPosts() {
    const response = await axios.post("/api/blog-post/fetchBlogPosts", {
      hobby,
    });
    setBlogContents(response.data.content);
    setBlogTitles(response.data.title);
    setBlogIDs(response.data._id);
  }

  async function fetchIndividualBlogPost(id: string) {
    const response = await axios.post("/api/blog-post/fetchSingleBlogPost", {
      id,
    });
    setIndBlogID(response.data._id);
    setIndBlogTitle(response.data.title);
    setIndBlogDate(response.data.date);
    setIndBlogContent(response.data.content);
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

  //If the page the path the user has requested to go to exists...
  //...then the corresponding page will be displayed
  //Otherwise, nothing will be displayed to the user
  if (trackerStatus == 201) {
    //If the second parameter is the word collections...
    if (tracker === "collections") {
      //...and has a url in its parameters as well...
      if (paramURL) {
        //...if paramURL is the word add, it will return the page...
        //...to add an item to the collection.
        if (paramURL === "add") {
          return <AddCollections hobby={hobby}></AddCollections>;
        } 
        //Otherwise, if it has the url parameter and the third parameter with the word "edit"...
        //... it will return the page to edit an item in the collection
        else if (desc === "edit") {
          return (
            <EditCollections
              hobby={hobby}
              paramURL={paramURL}
            ></EditCollections>
          );
        } 
        //A page with anything else in the url parameter besides the word "add"...
        //...will return a page to view the specified individual content 
        else {
          return (
            <IndCollections
              hobby={tracker}
              indTitle={indTitle}
              indDate={indDate}
              indImage={indImage!}
              indDesc={indDesc}
              paramURL={paramURL}
            ></IndCollections>
          );
        }
      } 
      //If there is no parameter of url...
      //...that means the user wants to view all the content they have in the collection...
      //...so the main Collections tracker page will be shown
      else {
        return (
          <Collections
            hobby={hobby}
            imageURLs={imageURLs}
            titles={titles}
          ></Collections>
        );
      }
    } 
    //If the second parameter is the word blog...
    else if (tracker === "blog") {
      //...and has a url in its parameters as well...
      if (paramURL) {
        //...if paramURL is the word add, it will return the page...
        //...to add a post to the blog.
        if (paramURL === "add") {
          return <AddBlog hobby={hobby}></AddBlog>;
        } 
        //Otherwise, if it has the url parameter and the third parameter with the word "edit"...
        //... it will return the page to edit a post in the blog
        else if (desc === "edit") {
          return <EditBlog hobby={hobby} paramURL={paramURL}></EditBlog>;
        } 
        //A page with anything else in the url parameter besides the word "add"...
        //...will return a page to view the specified individual content 
        else {
          return (
            <IndBlog
              hobby={hobby}
              indBlogTitle={indBlogTitle}
              indBlogDate={indBlogDate}
              indBlogContent={indBlogContent}
              paramURL={paramURL}
            ></IndBlog>
          );
        }
      } 
      //If there is no parameter of url...
      //...that means the user wants to view all the content they have in their blog...
      //...so the main Blog tracker page will be shown
      else {
        return (
<<<<<<< HEAD
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
=======
          <Blog
            hobby={hobby}
            blogContents={blogContents}
            blogTitles={blogTitles}
            blogIDs={blogIDs}
          ></Blog>
>>>>>>> e01b411e5476be555a24c21829bbd61d2679c02d
        );
      }
    } 
    //If the second parameter is the word supplies...
    else if (tracker === "supplies") {
      //...return supplies page
      
    }
  } else {
    return (
      <></>
    );
  }
}
