"use client"
import { useRouter } from "next/navigation";

export default function Collections(){
    const router = useRouter()
    const handleSubmit = () => {
        router.push('/dashboard/collections/add')
    }

    return(
    <>
        <div>
            <div><h1>Collection</h1></div>
            <div>
                <button type="button" onClick={handleSubmit}>Add Image</button>
            </div>
        </div>
    </>)
}