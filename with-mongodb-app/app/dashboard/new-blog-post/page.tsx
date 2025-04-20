'use client'

import axios from "axios"
import {useState} from "react"

export default function newBlogPost() {
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState('')
    const [blogID, setBlogID] = useState('')

    const handleSubmit = async(e: { preventDefault: () => void; }) => {
        e.preventDefault()
        try{
          const response = await axios.post('/api/blog-post', {title, date, content, image, blogID})
          console.log(response)
        } catch(err) {
          console.log(err)
        }
    }

    return (<>

    </>)

}