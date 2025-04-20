"use client"
import { useEdgeStore } from "@/lib/edgestore";
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File>()
  const [urls, setUrls] = useState<{
    url: string
    thumbnailUrl: string | null
  }>()
  const { edgestore } = useEdgeStore()
  
  return (
    <div className="flex flex-col items-center m-6 gap-2">
      <input type="file" onChange={(e) => {
        setFile(e.target.files?.[0])
      }}/>
      <button className="bg-white text-black rounded px-2 hover:opacity-80"
      onClick={async() => {
        if (file){
          const res = await edgestore.myPublicImages.upload({ file })
          setUrls({
            url: res.url,
            thumbnailUrl: res.thumbnailUrl
          })
        }
      }}>
        Upload
      </button>
      {urls?.url && <img src={urls.url}></img>}
    </div>
  );
}