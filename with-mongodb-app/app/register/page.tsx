"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        const response = await axios.post('/api/register', {name, email, password})
        console.log(response)
        router.push('/login')
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" placeholder="enter name" onChange={(e) => setName(e.target.value)}></input>
        </div>
        <div>
          <label>Email</label>
          <input type="email" placeholder="enter email" onChange={(e) => setEmail(e.target.value)}></input>
        </div>
        <div>
          <label>Password</label>
          <input type="password" placeholder="enter password" onChange={(e) => setPassword(e.target.value)}></input>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
