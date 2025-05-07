"use client";

import { useRouter } from "next/navigation";

//This is the component that will display the main Collections tracker page with all the user's items they added
//Accept hobby, imageURLs, and titles arguments from the hobby page that displays hobby trackers
type componentProps = {
  hobby: string | undefined;
  imageURLs: string[];
  titles: string[];
};

export default function Collections({
  hobby,
  imageURLs,
  titles,
}: componentProps): JSX.Element {
  //Setup router to redirect users to proper pages
  const router = useRouter();

  //Reoutes user to the individual collection page depending on the image they clicked on
  async function individualImageReroute(url: string) {
    const shortURL = encodeURIComponent(url);
    router.push(`/dashboard/hobby/${hobby}/collections/?url=${shortURL}`);
  }

  return (
    <>
      <div className="px-10 max-w-full">
        <div className="grid grid-cols-2">
          {/*Title of page*/}
          <div className="pt-[1.5vh] pb-[1.5vh] col-span-1 place-self-start">
            <h1 className="font-bold text-black text-2xl">Collection</h1>
          </div>
          {/*Add image button - redirects to add item page on click*/}
          <div className="pt-[1.5vh] pb-[1.5vh] col-span-1 place-self-end">
            <button
              type="button"
              className="p-[1.5vh] bg-black text-white rounded-md font-bold mr-[1.5vh]"
              onClick={() =>
                router.push(`/dashboard/hobby/${hobby}/collections?url=add`)
              }
            >
              Add Image
            </button>
          </div>
        </div>
        {/*Maps images and their titles to a div to display on the page*/}
        {/*When an image is clicked, it will redirect to the respective individual image page*/}
        <div>
          <div className="grid grid-cols-4">
            {imageURLs.map((url, index) => (
              <div
                key={index}
                onClick={() => individualImageReroute(url)}
                className="col-span-1 w-[15vw] h-[20vh] border-2 border-black rounded-md mt-[5vh] mb-[5vh] mr-[5vw] cursor-pointer"
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
