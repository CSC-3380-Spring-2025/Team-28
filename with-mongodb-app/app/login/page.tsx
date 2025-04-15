"use client";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const redirectRegister = () => {
    router.push("/register");
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const response = await axios.post("/api/login", { email, password });
    console.log(response);
    console.log();
    if (response.data.status == 201) {
      router.push("/dashboard");
    }
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
      <h1 className="font-bold text-6xl p-10">Hobby Helper</h1>
      <form onSubmit={handleSubmit}>
        <h2 className="mt-2 mb-1">Email</h2>
        <div className="">
          <input
            className="bg-[#D9D9D9] rounded-md text-black h-10 p-2"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <h2 className="mt-2 mb-1">Password</h2>
        <div>
          <input
            className="bg-[#D9D9D9] rounded-md text-black h-10 w-15 p-2"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>

          <button
            className="bg-black rounded-md text-white text-xl h-10 w-10 justify-center"
            type="submit"
          >
            →
          </button>
        </div>
      </form>
      <button
        onClick={redirectRegister}
        className="bg-black rounded-md text-white text-md h-10 w-20 justify-center my-3"
      >
        Register
      </button>
    </div>
  );
}
