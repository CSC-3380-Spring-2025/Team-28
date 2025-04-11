'use client'

import axios from "axios"
import { useParams } from 'next/navigation'
import { useState, useEffect } from "react"


export default function HobbyPage() {
    const params = useParams()
    const hobby = params.slug[0]
    const tracker = params.slug[1]

    const [x, setX] = useState(0)

    useEffect(() => {
        async function fetchPosts() {
            const response = await axios.post('/api/hobbyPage', {hobby, tracker})
            setX(response.data.status)
            console.log(response.data)
            console.log(x)
        }
        fetchPosts()
      }, [])

    if (x == 201){
            return (
                <h1> viewing page for hobby {hobby} and tracker type {tracker} </h1>
            )
    }
    else {
        return(<h1> hobby does not exist </h1>)
    }

}