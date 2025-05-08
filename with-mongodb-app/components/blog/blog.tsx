"use client";

import { useRouter } from "next/navigation";

//This is the component that will display the main Blog tracker page with all the user's items they added
//Accept hobby, contents, blog ids, and titles arguments from the hobby page that displays hobby trackers
type componentProps = {
  hobby: string | undefined;
  blogContents: string[];
  blogTitles: string[];
  blogIDs: any[];
};

export default function Blog({
  hobby,
  blogContents,
  blogTitles,
  blogIDs,
}: componentProps): JSX.Element {
  //Setup router to redirect users to proper pages
  const router = useRouter();

  //Reroutes user to the individual blog page depending on the post they clicked on
  async function individualBlogPostReroute(id: string) {
    router.push(
      `/dashboard/hobby/${hobby}/blog/?url=${encodeURIComponent(id)}`
    );
  }

  return (
    <>
      <div className="px-10 max-w-full">
        <div className="grid grid-cols-2">
          {/*Title of page*/}
          <div className="pt-[1.5vh] pb-[1.5vh] col-span-1 place-self-start">
            <h1 className="font-bold text-black text-2xl">Blog</h1>
          </div>
          {/*Add post button - redirects to add item page on click*/}
          <div className="pt-[1.5vh] pb-[1.5vh] col-span-1 place-self-end">
            <button
              type="button"
              className="p-[1.5vh] bg-black text-white rounded-md font-bold mr-[1.5vh]"
              onClick={() =>
                router.push(`/dashboard/hobby/${hobby}/blog?url=add`)
              }
            >
              Add Post
            </button>
          </div>
        </div>
        {/*Maps post titles and contents to a div to display on the page*/}
        {/*When a post is clicked, it will redirect to the respective individual blog page*/}
        <div>
          <div className="grid grid-cols-4">
            {blogContents.map((content, index) => (
              <div
                key={blogIDs[index].toString()}
                onClick={() =>
                  individualBlogPostReroute(blogIDs[index].toString())
                }
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
