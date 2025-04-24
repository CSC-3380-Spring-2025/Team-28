"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEdgeStore } from "@/lib/edgestore";
import { useState } from "react";

export default function addImage() {
  const [title, setTitle] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    
    //
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Image Name</label>
          <input
            type="text"
            placeholder="enter name"
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Upload an Image</label>
          <input
            type="file"
            onChange={(e) => {
              setFile(e.target.files?.[0]);
            }}
          />
        </div>
        <div>
          <label>Image Description</label>
          <input
            type="text"
            placeholder="enter description"
            onChange={(e) => setDescription(e.target.value)}
          ></input>
        </div>
        <button
          type="submit"
          onClick={async () => {
            if (file) {
              const res = await edgestore.myPublicImages.upload({ file });
              await axios.post("/api/collections/addImage", {
                title,
                imageURL: res.url,
                description,
              });
              router.push("/dashboard/collections");
            }
          }}
        >
          Add
        </button>
      </form>
    </div>
  );
}
