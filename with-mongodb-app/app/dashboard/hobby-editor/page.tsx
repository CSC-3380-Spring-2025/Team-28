'use client'

import ColorPicker from "@/components/color-picker";
import { Button } from "@/components/ui/button";
import { Pencil, Plus } from "lucide-react";
import Form from "next/form";
import { useState } from "react";
import axios from "axios"


export default function hobbyEditor(){
  const [hobby, setHobby] = useState('')
  const [tracker, setTracker] = useState('')

  const handleSubmit = async(e: { preventDefault: () => void; }) => {
    e.preventDefault()
    try{
      const response = await axios.post('/api/hobby', {hobby, tracker})
      console.log(response)
    } catch(err) {
      console.log(err)
    }
  }
    return(
        <>

        <div className="px-10">
        <div className="pt-[1.5vh] pb-[1.5vh]">
          <h1 className="font-bold text-2xl">Hobby Editor</h1>
        </div>
        <div className="grid grid-cols-3 gap-4 relative w-full max-w-full items-start">
          <h3 className="font-bold text-md pb-[1vh] col-span-3">Hobbies</h3>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="enter hobby" onChange={(e) => setHobby(e.target.value)}></input>
            <input type="text" placeholder="enter tracker type" onChange={(e) => setTracker(e.target.value)}></input>
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="grid grid-cols-3 gap-4 relative w-full max-w-full items-start pt-[2.5vh]">
          <h3 className="font-bold text-md pb-[1vh] col-span-3">
            Pages
          </h3>
        </div>
      </div>
    </>
)}