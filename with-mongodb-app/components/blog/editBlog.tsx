"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

//Accept hobby and paramURL arguments from the hobby page that displays hobby trackers
type componentProps = {
  hobby: string | undefined;
  paramURL: string;
};

export default function EditBlog({
  hobby,
  paramURL,
}: componentProps): JSX.Element {
  //useStates
  //Set the new title of the item
  const [indBlogTitle, setIndBlogTitle] = useState("");
  //Set the new content of the item
  const [indBlogContent, setIndBlogContent] = useState("");
  //Setup router to redirect users to proper pages
  const router = useRouter();

  return (
    <>
      <div className="px-10">
        {/*Title of page*/}
        <div className="pt-[1.5vh] pb-[1.5vh]">
          <h1 className="font-bold text-black text-2xl">
            Edit Post in Blog
          </h1>
        </div>
        {/*Form to submit item title and content to database*/}
        <form onSubmit={(e) => e.preventDefault()}>
          {/*Title input*/}
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
          {/*Content input*/}
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
          {/*Edit button - submits data to database and edits the information for corresponding document*/}
          <button
            type="submit"
            className="p-[1.5vh] bg-black text-white rounded-md font-bold mr-[1.5vh]"
            onClick={async () => {
              await axios.post("/api/blog-post/editBlogPost", {
                title: indBlogTitle,
                id: paramURL,
                content: indBlogContent,
              });
              router.push(`/dashboard/hobby/${hobby}/blog`);
            }}
          >
            Edit
          </button>
          {/*Cancel button - moves user back to the main Blog tracker page*/}
          <button
            className="p-[1.5vh] bg-gray-200 text-black rounded-md font-bold"
            onClick={() =>
              router.push(`/dashboard/hobby/${hobby}/blog`)
            }
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
}
