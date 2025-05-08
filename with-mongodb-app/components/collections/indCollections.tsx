"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

//This is the component that will display the individual Collections tracker page...
//...based on the image they clicked on the main Collections tracker page
//Accept hobby, independent title, independent date, independent image, independent description, and paramURL...
//...arguments from the hobby page that displays hobby trackers
type componentProps = {
  hobby: string | undefined;
  indTitle: string;
  indDate: string;
  indImage: string;
  indDesc: string;
  paramURL: string;
};

export default function IndCollections({
  hobby,
  indTitle,
  indDate,
  indImage,
  indDesc,
  paramURL,
}: componentProps): JSX.Element {
  //Setup router to redirect users to proper pages
  const router = useRouter();

  //Updates the database to removed the specified image from the Collections collection...
  //...then redirects the user back to the main Collections tracker page
  async function deleteImage(url: string | null) {
    await axios.post("/api/collections/deleteImage", { url });
    router.push(`/dashboard/hobby/${hobby}/collections`);
  }

  return (
    <>
      <div className="px-10">
        <div className="grid grid-cols-2 w-full">
          {/*Title of item*/}
          <div className="pt-[1.5vh] pb-[1.5vh] col-span-1 place-self-start">
            <h1 className="font-bold text-black text-2xl">{indTitle}</h1>
          </div>
          <div className="pt-[1.5vh] pb-[1.5vh] col-span-1 place-self-end">
            {/*Edit button - redirects to edit item page on click*/}
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
            {/*Delete button - redirects to main Collections tracker after deleting item*/}
            <button
              type="button"
              className="p-[1.5vh] bg-[#ED2727] text-white rounded-md font-bold mr-[1.5vh]"
              onClick={() => deleteImage(paramURL)}
            >
              Delete
            </button>
          </div>
        </div>
        {/*Display of the individual item's attributes*/}
        {/*Date item was added*/}
        <div>
          <span>{indDate}</span>
        </div>
        <div>
          {/*Item image*/}
          <div className="w-1/2 h-1/2">
            <img src={indImage}></img>
          </div>
          {/*Item description*/}
          <div>
            <p>{indDesc}</p>
          </div>
        </div>
      </div>
    </>
  );
}
