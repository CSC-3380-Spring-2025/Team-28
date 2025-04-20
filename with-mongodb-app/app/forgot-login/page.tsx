"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setcPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const response = await axios.post("/api/forgot-password", {
      email,
      password,
    });
    console.log(response);
    console.log();
    if (response.data.status == 404) {
      //404 needs to be changed to actual status
      router.push("/login");
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
      <h1 className="font-bold text-7xl mb-9">Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <h2 className="mt-2 mb-1">Email</h2>
          <input
            className="bg-[#D9D9D9] rounded-md text-black h-10 p-2"
            type="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <h2 className="mt-2 mb-1">Password</h2>
          <input
            className="bg-[#D9D9D9] rounded-md text-black h-10 p-2"
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div className="flex items-center justify-center mt-10 mb-2">
          <button
            type="submit"
            className="hover:bg-gray-700 bg-black rounded-md text-white text-xl h-10 w-40"
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
}
