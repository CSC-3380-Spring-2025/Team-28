'use client'

import axios from "axios"
import {useState} from "react"

export default function newBlogPost() {
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [content, setContent] = useState('')
    const [email, setEmail] = useState('')
    const [hobby, setHobby] = useState('')

    const handleSubmit = async(e: { preventDefault: () => void; }) => {
        e.preventDefault()
        try{
          const response = await axios.post('/api/blog-post', {title, date, content, email, hobby})
          console.log(response)
        } catch(err) {
          console.log(err)
        }
    }

    return (<>
      <div className="px-10">
        <div className="pt-[1.5vh] pb-[1.5vh]">
          <h1 className="font-bold text-2xl">Blog Post</h1>
        </div>
        <div className="grid grid-cols-3 gap-4 relative w-full max-w-full items-start">
          <h3 className="font-bold text-md pb-[1vh] col-span-3">Hobbies</h3>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter title" onChange={(e) => setTitle(e.target.value)}></input>
            <input type="text" placeholder="Enter date" onChange={(e) => setDate(e.target.value)}></input>
            <input type="text" placeholder="Enter post text" onChange={(e) => setContent(e.target.value)}></input>
            /**handle email adn hobby**/
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>)

}