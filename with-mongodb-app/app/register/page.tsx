"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const response = await axios.post("/api/register", {
      name,
      email,
      password,
    });
    console.log(response);
    router.push("/login");
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <h1 className="font-bold text-6xl p-10">Create Account</h1>
      <form onSubmit={handleSubmit}>
        <label className="h-10 w-15 p-2">Name</label>
        <div>
          <input
            className="bg-[#D9D9D9] rounded-md text-black h-10 p-2"
            type="text"
            placeholder="enter name"
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <label className="h-10 w-15 p-2">Email</label>
        <div>
          <input
            className="bg-[#D9D9D9] rounded-md text-black h-10 w-15 p-2"
            type="email"
            placeholder="enter email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <label className="h-10 w-15 p-2">Password</label>
        <div>
          <input
            className="bg-[#D9D9D9] rounded-md text-black h-10 w-15 p-2"
            type="password"
            placeholder="enter password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <button
          type="submit"
          className="bg-black rounded-md text-white text-xl h-10 w-20 justify-center"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
