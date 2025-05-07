'use client'

import { useState } from "react";
import axios from "axios"


export default function hobbyEditor(){
  const [hobby, setHobby] = useState('')
  const [tracker, setTracker] = useState('')

  const handleHobbyAdd = async(e: { preventDefault: () => void; }) => {
    e.preventDefault()
    try{
      const response = await axios.post('/api/hobby/hobbyAdd', {hobby})
      console.log(response)
    } catch(err) {
      console.log(err)
    }
  }
  const handleHobbyDelete = async(e: { preventDefault: () => void; }) => {
    e.preventDefault()
    try{
      const response = await axios.post('/api/hobby/hobbyDelete', {hobby})
      console.log(response)
    } catch(err) {
      console.log(err)
    }
  }
  const handlePageAdd = async(e: { preventDefault: () => void; }) => {
    console.log("hii")
    e.preventDefault()
    try{
      const response = await axios.post('/api/hobby/pageAdd', {hobby, tracker})
      console.log(response)
    } catch(err) {
      console.log(err)
    }
  }
  const handlePageDelete = async(e: { preventDefault: () => void; }) => {
    e.preventDefault()
    try{
      const response = await axios.post('/api/hobby/pageDelete', {hobby, tracker})
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
          <form>
            <input type="text" placeholder="enter hobby" onChange={(e) => setHobby(e.target.value)}></input>
            <button type="submit" onClick={handleHobbyAdd}>Add</button>
            <button type="submit" onClick={handleHobbyDelete}>Delete</button>
          </form>
        </div>
        <div className="grid grid-cols-3 gap-4 relative w-full max-w-full items-start pt-[2.5vh]">
          <h3 className="font-bold text-md pb-[1vh] col-span-3">
            Pages
          </h3>
          <form>
            <input type="text" placeholder="enter hobby" onChange={(e) => setHobby(e.target.value)}></input>
            <input type="text" placeholder="enter tracker type" onChange={(e) => setTracker(e.target.value)}></input>
            <button type="submit" onClick={handlePageAdd}>Add</button>
            <button type="submit" onClick={handlePageDelete}>Delete</button>
          </form>
        </div>
      </div>
    </>
)}