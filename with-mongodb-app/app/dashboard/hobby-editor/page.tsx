'use client'

import { useState } from "react";
import axios from "axios"

export default function hobbyEditor(){
  //useStates
  //Sets hobby of user
  const [hobby, setHobby] = useState('')
  //Sets tracker page of user
  const [tracker, setTracker] = useState('')

  //This will add a hobby to the user's document in the database
  const handleHobbyAdd = async(e: { preventDefault: () => void; }) => {
    e.preventDefault()
    try{
      await axios.post('/api/hobby/hobbyAdd', {hobby})
    } catch(err) {
      console.log(err)
    }
  }

  //This will remove a hobby from the user's document in the database
  const handleHobbyDelete = async(e: { preventDefault: () => void; }) => {
    e.preventDefault()
    try{
      await axios.post('/api/hobby/hobbyDelete', {hobby})
    } catch(err) {
      console.log(err)
    }
  }

  //This will add a tracker page to the user's document in the database
  const handlePageAdd = async(e: { preventDefault: () => void; }) => {
    e.preventDefault()
    try{
      const response = await axios.post('/api/hobby/pageAdd', {hobby, tracker})
      console.log(response)
    } catch(err) {
      console.log(err)
    }
  }

  //This will remove a tracker page from the user's document in the database
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
        {/*Title of page*/}
        <div className="pt-[1.5vh] pb-[1.5vh]">
          <h1 className="font-bold text-2xl">Hobby Editor</h1>
        </div>
        {/*Section to add hobbies*/}
        <div className="grid grid-cols-3 gap-4 relative w-full max-w-full items-start">
          <h3 className="font-bold text-md pb-[1vh] col-span-3">Hobbies</h3>
          <form className="flex flex-col">
            {/*User input for desired hobby to add*/}
            <input type="text" placeholder="enter hobby" className="border-black border-2 border-solid rounded-sm p-[0.5vh] bg-gray-200 mb-[1vh]" onChange={(e) => setHobby(e.target.value)}></input>
            <div className="flex">
              {/*Add button - on click, will add the inputed hobby*/}
              <button type="submit" onClick={handleHobbyAdd} className="p-[1.5vh] bg-black text-white rounded-md font-bold mr-[1.5vh]">Add</button>
              {/*Add button - on click, will delete the inputed hobby*/}
              <button type="submit" onClick={handleHobbyDelete} className="p-[1.5vh] bg-black text-white rounded-md font-bold mr-[1.5vh]">Delete</button>
            </div>
          </form>
        </div>
        {/*Section to add tracker pages*/}
        <div className="grid grid-cols-3 gap-4 relative w-full max-w-full items-start pt-[2.5vh]">
          <h3 className="font-bold text-md pb-[1vh] col-span-3">
            Pages
          </h3>
          <form className="flex flex-col">
            {/*User input for hobby to add a tracker page path to*/}
            <input type="text" placeholder="enter hobby" className="border-black border-2 border-solid rounded-sm p-[0.5vh] bg-gray-200 mb-[1vh]" onChange={(e) => setHobby(e.target.value)}></input>
            {/*User input for tracker type to add*/}
            <input type="text" placeholder="enter tracker type" className="border-black border-2 border-solid rounded-sm p-[0.5vh] bg-gray-200 mb-[1vh]" onChange={(e) => setTracker(e.target.value)}></input>
            <div className="flex">
              {/*Add button - on click, will add the path to the tracker page based on input*/}
              <button type="submit" onClick={handlePageAdd} className="p-[1.5vh] bg-black text-white rounded-md font-bold mr-[1.5vh]">Add</button>
              {/*Delete button - on click, will delete the path to the tracker page based on input*/}
              <button type="submit" onClick={handlePageDelete} className="p-[1.5vh] bg-black text-white rounded-md font-bold mr-[1.5vh]">Delete</button>
            </div>
          </form>
        </div>
      </div>
    </>
)}