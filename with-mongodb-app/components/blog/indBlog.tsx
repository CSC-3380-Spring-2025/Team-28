"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

//This is the component that will display the individual Collections tracker page...
//...based on the image they clicked on the main Collections tracker page
//Accept hobby, independent title, independent date, independent image, independent description, and paramURL...
//...arguments from the hobby page that displays hobby trackers
type componentProps = {
  hobby: string | undefined;
  indBlogTitle: string;
  indBlogDate: string;
  indBlogContent: string;
  paramURL: string;
};

export default function IndBlog({
  hobby,
  indBlogTitle,
  indBlogDate,
  indBlogContent,
  paramURL,
}: componentProps): JSX.Element {
  //Setup router to redirect users to proper pages
  const router = useRouter();

  //Updates the database to removed the specified image from the Collections collection...
  //...then redirects the user back to the main Collections tracker page
  async function deleteBlogPost(id: string) {
      await axios.post("/api/blog-post/deleteBlogPost", { id });
      router.push(`/dashboard/hobby/${hobby}/blog`);
    }

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
                          `/dashboard/hobby/${hobby}/blog/edit?url=${paramURL}`
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
